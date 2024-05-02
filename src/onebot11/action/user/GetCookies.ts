import { OB11User } from '../../types';
import { OB11Constructor } from '../../constructor';
import { friends } from '@/core/data';
import BaseAction from '../BaseAction';
import { ActionName } from '../types';
import { NTQQUserApi } from '@/core/apis';
interface Payload {
  domain: string
}
interface Response {
  cookies: string
}
export class GetCookies extends BaseAction<Payload, Response> {
  actionName = ActionName.GetCookies;

  protected async _handle(payload: Payload) {
    if (!payload.domain){
      throw new Error('缺少参数 domain');
    }
    const _Skey = await NTQQUserApi.getSkey();
    // 取Skey
    // 先NodeIKernelTicketService.forceFetchClientKey('')
    // 返回值
    // {
    //     result: 0,
    //     errMsg: '',
    //     url: '',
    //     keyIndex: '19',
    //     clientKey: 'clientKey',
    //     expireTime: '7200'
    //   }
    // request https://ssl.ptlogin2.qq.com/jump?ptlang=1033&clientuin=1627126029&clientkey=key
    // &u1=https%3A%2F%2Fh5.qzone.qq.com%2Fqqnt%2Fqzoneinpcqq%2Ffriend%3Frefresh%3D0%26clientuin%3D0%26darkMode%3D0&keyindex=keyIndex
    const _PSkey = (await NTQQUserApi.getPSkey([payload.domain]))[payload.domain];
    // 取Pskey 
    // NodeIKernelTipOffService.getPskey([ 'qun.qq.com' ], true )
    // {
    //     domainPskeyMap: 0,
    //     errMsg: 'success',
    //     domainPskeyMap: Map(1) {
    //       'qun.qq.com' => 'pskey'
    //     }
    //   }
    if (!_PSkey || !_Skey) {
      throw new Error('获取Cookies失败');
    }
    const cookies = `pskey=${_PSkey}; skey=${_Skey}`;
    return {
      cookies
    };
  }
}
