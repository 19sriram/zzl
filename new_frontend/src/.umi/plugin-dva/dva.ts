// @ts-nocheck
import { Component } from 'react';
import { ApplyPluginsType } from 'umi';
import dva from 'dva';
// @ts-ignore
import createLoading from '/Users/sram/Documents/lms_project/lms/node_modules/dva-loading/dist/index.esm.js';
import { plugin, history } from '../core/umiExports';
import ModelGlobal0 from '/Users/sram/Documents/lms_project/lms/src/models/global.ts';
import ModelLogin1 from '/Users/sram/Documents/lms_project/lms/src/models/login.ts';
import ModelSetting2 from '/Users/sram/Documents/lms_project/lms/src/models/setting.ts';
import ModelUser3 from '/Users/sram/Documents/lms_project/lms/src/models/user.ts';
import ModelModel4 from '/Users/sram/Documents/lms_project/lms/src/pages/account/center/model.ts';
import ModelModel5 from '/Users/sram/Documents/lms_project/lms/src/pages/account/settings/model.ts';
import ModelModel6 from '/Users/sram/Documents/lms_project/lms/src/pages/dashboard/analysis/model.ts';
import ModelModel7 from '/Users/sram/Documents/lms_project/lms/src/pages/dashboard/monitor/model.ts';
import ModelModel8 from '/Users/sram/Documents/lms_project/lms/src/pages/dashboard/workplace/model.ts';
import ModelModel9 from '/Users/sram/Documents/lms_project/lms/src/pages/form/advanced-form/model.ts';
import ModelModel10 from '/Users/sram/Documents/lms_project/lms/src/pages/form/basic-form/model.ts';
import ModelModel11 from '/Users/sram/Documents/lms_project/lms/src/pages/form/step-form/model.ts';
import ModelModel12 from '/Users/sram/Documents/lms_project/lms/src/pages/list/basic-list/model.ts';
import ModelModel13 from '/Users/sram/Documents/lms_project/lms/src/pages/list/card-list/model.ts';
import ModelModel14 from '/Users/sram/Documents/lms_project/lms/src/pages/list/search/applications/model.ts';
import ModelModel15 from '/Users/sram/Documents/lms_project/lms/src/pages/list/search/articles/model.ts';
import ModelModel16 from '/Users/sram/Documents/lms_project/lms/src/pages/list/search/projects/model.ts';
import ModelModel17 from '/Users/sram/Documents/lms_project/lms/src/pages/profile/advanced/model.ts';
import ModelModel18 from '/Users/sram/Documents/lms_project/lms/src/pages/profile/basic/model.ts';
import ModelModel19 from '/Users/sram/Documents/lms_project/lms/src/pages/User/register/model.ts';

let app:any = null;

export function _onCreate(options = {}) {
  const runtimeDva = plugin.applyPlugins({
    key: 'dva',
    type: ApplyPluginsType.modify,
    initialValue: {},
  });
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    // @ts-ignore
    ...(typeof window !== 'undefined' && window.g_useSSR ? { initialState: window.g_initialProps } : {}),
    ...(options || {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach((plugin:any) => {
    app.use(plugin);
  });
  app.model({ namespace: 'global', ...ModelGlobal0 });
app.model({ namespace: 'login', ...ModelLogin1 });
app.model({ namespace: 'setting', ...ModelSetting2 });
app.model({ namespace: 'user', ...ModelUser3 });
app.model({ namespace: 'model', ...ModelModel4 });
app.model({ namespace: 'model', ...ModelModel5 });
app.model({ namespace: 'model', ...ModelModel6 });
app.model({ namespace: 'model', ...ModelModel7 });
app.model({ namespace: 'model', ...ModelModel8 });
app.model({ namespace: 'model', ...ModelModel9 });
app.model({ namespace: 'model', ...ModelModel10 });
app.model({ namespace: 'model', ...ModelModel11 });
app.model({ namespace: 'model', ...ModelModel12 });
app.model({ namespace: 'model', ...ModelModel13 });
app.model({ namespace: 'model', ...ModelModel14 });
app.model({ namespace: 'model', ...ModelModel15 });
app.model({ namespace: 'model', ...ModelModel16 });
app.model({ namespace: 'model', ...ModelModel17 });
app.model({ namespace: 'model', ...ModelModel18 });
app.model({ namespace: 'model', ...ModelModel19 });
  return app;
}

export function getApp() {
  return app;
}

/**
 * whether browser env
 * 
 * @returns boolean
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
}

export class _DvaContainer extends Component {
  constructor(props: any) {
    super(props);
    // run only in client, avoid override server _onCreate()
    if (isBrowser()) {
      _onCreate()
    }
  }

  componentWillUnmount() {
    let app = getApp();
    app._models.forEach((model:any) => {
      app.unmodel(model.namespace);
    });
    app._models = [];
    try {
      // 释放 app，for gc
      // immer 场景 app 是 read-only 的，这里 try catch 一下
      app = null;
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    let app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
