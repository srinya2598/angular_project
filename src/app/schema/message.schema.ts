export const MESSAGE_SCHEMA = {
  version: 0,
  type: "object",
  properties: {
    id: {
      type: "string",
      primary: true
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
      properties: {
        id: {
          type: "number"
        },
        full_name: {
          type: "string"
        },
        profile_pic: {
          type: "string"
        }
      }
    },
    user: {
      type: "object",
      properties: {
        id: {
          type: "number"
        },
        full_name: {
          type: "string"
        },
        profile_pic: {
          type: "string"
        }
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
          type: "number"
        }
      }
    }
  }
};
