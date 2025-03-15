interface Device {
    onlineInDb: boolean;
    deviceId: number;
    ssid: string| null;
    downloadMqttUrlResponseCode:number;
    deviceName: string | null;
    syncTime:string | null;
    macAddress: string | null;
    ipAddress: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    online: boolean;
    codeVersion: string | null;
    bootTime: string | null;
    activeState: number | null;
    applianceState: string | null;
    powersave: boolean | null;
    username: string | null;
    millis: number | null;
    wifiSignalStrength: number | null;
    boot_status_code: number;
    message_publish_status: boolean;
    nvs_free: number | null;
    nvs_total: number | null;
    nvs_used: number | null;
    spiffs_used: number | null;
    spiffs_total: number | null;
    users: string | null;
  }

export default Device;