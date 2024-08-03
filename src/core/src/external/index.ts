import { napCatCore } from '@/core';
import * as pb from './protobuf';

export class NTQQExternaiApi {
  static sendGroupPoke(groupId: string, uin: string) {
    const proto = pb.encode({
      1: 0xed3,
      2: 1,
      4: {
        1: Number(uin),
        2: Number(groupId)
      }
    });
    napCatCore.session.getMsgService().sendSsoCmdReqByContend('OidbSvcTrpcTcp.0xed3_1', Buffer.from(proto).toString('utf-8'));
  }
}
