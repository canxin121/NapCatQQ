import BaseAction from '@/onebot11/action/BaseAction';
import { ActionName } from '@/onebot11/action/types';
import { NTQQExternaiApi } from '@/core/external';
import { FromSchema, JSONSchema } from 'json-schema-to-ts';

const SchemaData = {
  type: 'object',
  properties: {
    group_id: { type: [ 'number' , 'string' ] },
    user_id: { type: [ 'number' , 'string' ] },
  },
  required: ['group_id', 'user_id']
} as const satisfies JSONSchema;

type Payload = FromSchema<typeof SchemaData>;


export class GroupPoke extends BaseAction<Payload, any> {
  actionName = ActionName.GroupPoke;

  protected async _handle(payload: Payload) {
    return await NTQQExternaiApi.sendGroupPoke(payload.group_id.toString(), payload.user_id.toString());
  }
}
