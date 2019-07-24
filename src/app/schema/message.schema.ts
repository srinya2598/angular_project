export const MESSAGE_SCHEMA = {
  version: 0,
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true
    },
    roomId: {
      type: 'string',
    },
    type: {
      type: 'string'
    },
    timestamp: {
      type: 'number',
      index: true
    },

    isFav: {

      type: 'boolean',
      final: false

    },
    text: {
      type: 'string',
      nullable: true
    },
    sender: {
      type: 'string',
    },
    receiver: {
      type: 'string',
    },
    audio: {
      type: 'object',
      nullable: true,
      properties: {
        audio_url: {
          type: 'string'
        },
        audio_duration: {
          type: 'number'
        }
      }
    },
    image: {
      type: 'object',
      nullable: true,
      properties: {
        image_url: {
          type: 'string'
        },
        caption: {
          nullable: true,
          type: 'string'
        }
      }
    }
  }
};
