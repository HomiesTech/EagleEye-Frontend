interface Device {
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
    signalStrength: number | null;
    deviceUsers: Array<{
      customerId: number | null;
      name: string | null;
      userCode: string | null;
      userIpAddress: string | null;
      userFailureCount: string | null;
    }> | null;
  }

export default Device;