/* eslint-disable */
const { writeFile } = require('fs');
const conventionalChangelog = require('conventional-changelog');

let changeLog = '';
const stream = conventionalChangelog({
  preset: 'angular',
  releaseCount: 0,
});
stream.on('data', chunk => {
  changeLog += chunk;
});
stream.on('end', () => {
  write(changeLog);
});

function write(data) {
  writeFile(
    'packages/components/src/__stories__/Changelog.stories.mdx',
    `
import { Meta } from '@storybook/addon-docs/blocks';

<Meta title="Basic|Changelog" />

${data}

<Divider/>

# [1.0.0-beta.2](https://git.wosai-inc.com/web/wosai-design/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2020-03-06)

### Features

- **components:** 新增 React Hooks：usePullToRefresh，下拉刷新
- **components:** Loading 组件\`type\`属性增加枚举值：\`"shou"\`（收钱吧撒钱动画）

### Bug Fixes

- **components:** 解决 NavBar 组件子节点（children）文本内容过长时，整个导航条溢出屏幕的问题
- **components:** 解决 Dialog 相关组件弹出后，在 Mask 冻结屏幕情况下，弹层下的内容区依旧能够通过触摸滚动的问题

<Divider/>

# [1.0.0-beta.1](https://git.wosai-inc.com/web/wosai-design/compare/v1.0.0-beta.0...v1.0.0-beta.1) (2020-03-03)

### Bug Fixes

- **components:** 将 package.json 文件中"peerDependencies"字段的：react、react-dom、react-transition-group、styled-components 挪到"dependencies"字段
- **utils:** 修复 useHD 函数，解决服务端渲染时，umi-hd 依赖库导致"window is not defined"的问题

<Divider/>

# [1.0.0-beta.0](https://git.wosai-inc.com/web/wosai-design/compare/39cf4a4e461adb0dc59250e01528d964051851b0...v1.0.0-beta.0) (2020-02-04)

### Features

- **components:** Button
- **components:** Dialog
  - Alert
  - Confirm
  - Mask
  - Operation
  - Prompt
- **components:** Form
  - ImageInputItem
  - InputItem
  - SwitchItem
  - TextareaItem
- **components:** Loading
- **components:** NavBar
- **components:** Spinner
- **components:** Tabs
- **components:** Toast
- **components:** Exception
  - NotFound
- **components:** List
- **components:** typography
  - Numeric
  - Text
  - Title
- **components:** Layout
  - WhiteSpace
  - WingBlank
- **utils:** closest 函数
- **utils:** countSymbols 函数
- **utils:** px2px 函数
- **utils:** px2rem 函数
- **utils:** Uploader 工具类
- **utils:** useHD 函数
- **utils:** useResize 钩子

`
      .replace(/\*\*components:\*\*/g, '**@wosai/design-components:**')
      .replace(/\*\*utils:\*\*/g, '**@wosai/design-utils:**'),
    'utf8',
    err => {
      if (err) {
        console.error(err);
        process.exit(1);
      } else {
        process.exit(0);
      }
    },
  );
}
