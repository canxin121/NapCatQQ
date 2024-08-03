import { napCatCore } from '@/core';
import * as pb from './protobuf';

export class NTQQExternaiApi {
  static async sendGroupPoke(groupId: string, uin: string) {
    const proto = pb.encode({
      1: 0xed3,
      2: 1,
      4: {
        1: Number(uin),
        2: Number(groupId)
      }
    });
    return await napCatCore.session.getMsgService().sendSsoCmdReqByContend('OidbSvcTrpcTcp.0xed3_1', proto);
  }
}
