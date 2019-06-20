export const MESSAGE_SCHEMA = {
  version: 0,
  type: "object",
  properties: {
    id: {
      type: "string",
      primary: true
    },
    roomid: {
      type: "string",
      nullable: false
    },
    type: {
      type: "string"
    },
    timestamp: {
      type: "number",
      index: true
    },
    text: {
      type: "string",
      nullable: true
    },
    sender: {
      type: "object",
      nullable: true,
      properties: {
        id: {
          type: "string"
        },
        full_name: {
          type: "string"
        },
        profile_pic: {
          type: "string"
        },
      }
    },
    user: {
      type: "string",
      nullable: true,
      properties: {
        id: {
          type: "string"
        },
        full_name: {
          type: "string"
        },
        profile_pic: {
          type: "string"
        },
      }
    },
    audio: {
      type: "object",
      nullable: true,
      properties: {
        audio_url: {
          type: "string"
        },
        audio_duration: {
          type: "number"
        }
      }
    },
    image: {
      type: "object",
      nullable: true,
      properties: {
        image_url: {
          type: "string"
        },
        caption: {
          nullable: true,
          type: "string"
        }
      }
    }
  }
};
