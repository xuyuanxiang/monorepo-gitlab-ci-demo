const { spawn } = require('child_process');
const { EOL } = require('os');
const https = require('https');
const {
  name,
  version,
  publishConfig: { registry },
} = require('../packages/components/package.json');

const USER = process.env.NPM_USER;
const PWD = process.env.NPM_PASSWORD;
const EMAIL = process.env.NPM_BASE64_EMAIL ? Buffer.from(process.env.WS_NPM_BASE64_EMAIL, 'base64').toString() : '';

function getLatestVersion() {
  return new Promise(resolve => {
    const url = `${registry}${name}`;
    console.info(`GET the latest version from ${url}`);
    https
      .get(url, res => {
        let body = '';
        res.on('data', data => {
          body += data;
        });

        res.on('close', () => {
          try {
            const json = JSON.parse(body);
            if (json['dist-tags'] && json['dist-tags'].latest) {
              resolve(json['dist-tags'].latest);
            } else {
              console.warn('get latest version failed, fallback to read from package.json');
              resolve(version);
            }
          } catch (ignored) {
            console.warn('get latest version failed, fallback to read from package.json');
            resolve(version);
          }
        });
      })
      .on('error', e => {
        console.warn('get latest version failed, fallback to read from package.json');
        resolve(version);
      });
  });
}

function lernaPublish(...args) {
  const lernaPublish = spawn('lerna', ['publish', ...args, '--yes']);
  lernaPublish.stderr.on('data', data => {
    console.error(`lerna - ${data}`);
  });
  lernaPublish.stdout.on('data', data => {
    console.info(`lerna - ${data}`);
  });
  lernaPublish.on('error', err => console.error(`lerna - `, err));
  lernaPublish.on('close', code => process.exit(code));
}

function isFeature(branch) {
  return /^feature\/.+/.test(branch);
}

function isHotfix(branch) {
  return /^hotfix\/.+/.test(branch);
}

function publish(branch) {
  if (isFeature(branch)) {
    lernaPublish('minor');
  } else if (isHotfix(branch)) {
    lernaPublish('patch');
  }
}

function prePublish(branch) {
  getLatestVersion().then(version => {
    if (/^\d+\.\d+\.\d+-beta\.\d+$/.test(version)) {
      lernaPublish('prerelease');
    } else if (/^\d+\.\d+\.\d+$/) {
      if (isFeature(branch)) {
        lernaPublish('preminor', '--preid', 'beta');
      } else if (isHotfix(branch)) {
        lernaPublish('prepatch', '--preid', 'beta');
      }
    }
  });
}

function npmLogin() {
  if (!USER) {
    throw new Error(`Required environment variable: "NPM_USER" was not present.`);
  }
  if (!PWD) {
    throw new Error(`Required environment variable: "NPM_PASSWORD" was not present.`);
  }
  if (!EMAIL) {
    throw new Error(`Required environment variable: "NPM_BASE64_EMAIL" was not present.`);
  }

  const npmLogin = spawn('npm', ['login', '-registry', registry]);

  const timer = setTimeout(() => {
    console.error('npm login timeout');
    process.exit(1);
  }, 15000);

  npmLogin.stdout.on('data', data => {
    const text = data.toString();
    if (text.startsWith('Username')) {
      npmLogin.stdin.write(`${USER}${EOL}`, 'utf-8');
    } else if (text.startsWith('Password')) {
      npmLogin.stdin.write(`${PWD}${EOL}`, 'utf-8');
    } else if (text.startsWith('Email')) {
      npmLogin.stdin.write(`${EMAIL}${EOL}`, 'utf-8');
    } else {
      console.info(`npm - ${text}`);
    }
  });

  npmLogin.stderr.on('data', data => {
    console.error(`npm - ${data}`);
  });

  npmLogin.on('close', code => {
    clearTimeout(timer);
    if (code === 0) {
      if (process.env.WS_SOURCE_BRANCH) {
        console.info(`publish - merge request source branch=${process.env.WS_SOURCE_BRANCH}`);
        publish(process.env.WS_SOURCE_BRANCH);
      } else if (process.env.WS_CURRENT_BRANCH) {
        console.info(`prepublish - commit branch=${process.env.WS_CURRENT_BRANCH}`);
        prePublish(process.env.WS_CURRENT_BRANCH);
      } else {
        lernaPublish('from-package');
      }
    } else {
      process.exit(code);
    }
  });
}

npmLogin();
