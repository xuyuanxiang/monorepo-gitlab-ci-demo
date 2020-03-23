import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '../Button';

storiesOf('Components|Button', module)
  .addParameters({ component: Button })
  .add('default', function Example() {
    return <Button>主按钮-默认</Button>;
  })
  .add('disabled', function Example() {
    return <Button disabled>主按钮-未激活</Button>;
  })
  .add('small', function Example() {
    return <Button spec="small">主按钮-小按钮</Button>;
  })
  .add('short', function Example() {
    return <Button spec="short">主按钮-短按钮</Button>;
  })
  .add('secondary', function Example() {
    return <Button scene="secondary">次按钮</Button>;
  })
  .add('secondary-disabled', function Example() {
    return (
      <Button disabled scene="secondary">
        次按钮-未激活
      </Button>
    );
  })
  .add('secondary-small', function Example() {
    return (
      <Button scene="secondary" spec="small">
        次按钮-小按钮
      </Button>
    );
  })
  .add('secondary-short', function Example() {
    return (
      <Button scene="secondary" spec="short">
        次按钮-短按钮
      </Button>
    );
  });
