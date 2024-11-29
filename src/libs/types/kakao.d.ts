interface KakaoStatic {
  VERSION: string;
  init(appKey: string): void;
  isInitialized(): boolean;
  cleanup(): void;

  Auth: {
    login(settings: {
      success?: (response: { access_token: string }) => void;
      fail?: (error: any) => void;
      always?: () => void;
      throughTalk?: boolean;
      redirectUri?: string;
      scope?: string;
    }): void;
    logout(callback?: () => void): void;
    getAccessToken(): string | null;
    setAccessToken(token: string): void;
    getAppKey(): string;
    getStatusInfo(callback: (status: 'connected' | 'not_connected') => void): void;
  };

  API: {
    request<T = any>(settings: {
      url: string;
      data?: any;
      files?: File[];
      success?: (response: T) => void;
      fail?: (error: any) => void;
      always?: () => void;
    }): void;
    story: {
      share(settings: { url: string; text?: string }): void;
    };
  };

  Share: {
    createCustomButton(settings: {
      container: string | HTMLElement;
      templateId: number;
      templateArgs?: Record<string, string>;
      installTalk?: boolean;
      callback?: () => void;
    }): void;
    sendDefault(settings: {
      objectType: 'feed' | 'list' | 'commerce' | 'location' | 'text';
      content: {
        title: string;
        description: string;
        imageUrl: string;
        link: {
          mobileWebUrl?: string;
          webUrl?: string;
          androidExecutionParams?: string;
          iosExecutionParams?: string;
        };
      };
      itemContent?: {
        profileText?: string;
        profileImageUrl?: string;
        titleImageUrl?: string;
        titleImageText?: string;
        titleImageCategory?: string;
        items?: Array<{ item: string; itemOp: string }>;
      };
      social?: {
        likeCount?: number;
        commentCount?: number;
        sharedCount?: number;
        viewCount?: number;
      };
      buttons?: Array<{
        title: string;
        link: {
          mobileWebUrl?: string;
          webUrl?: string;
          androidExecutionParams?: string;
          iosExecutionParams?: string;
        };
      }>;
    }): void;
    sendScrap(settings: { requestUrl: string; templateId?: number; templateArgs?: Record<string, string> }): void;
  };

  Channel: {
    createAddChannelButton(settings: {
      container: string | HTMLElement;
      channelPublicId: string;
      size?: 'small' | 'large';
      supportMultipleDensities?: boolean;
    }): void;
    chat(settings: { channelPublicId: string }): void;
    addChannel(settings: { channelPublicId: string }): void;
  };

  Navi: {
    start(settings: {
      name: string;
      x: number;
      y: number;
      coordType?: 'wgs84' | 'katec';
      vehicleType?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
      rpOption?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 100;
      routeInfo?: boolean;
      sX?: number;
      sY?: number;
      sAngle?: number;
    }): void;
    share(settings: { name: string; x: number; y: number; coordType?: 'wgs84' | 'katec' }): void;
  };

  Picker: {
    selectFriends(settings: {
      title?: string;
      enableSearch?: boolean;
      showMyProfile?: boolean;
      showFavorite?: boolean;
      showPickedFriend?: boolean;
      maxPickableCount?: number;
      minPickableCount?: number;
      enableBackButton?: boolean;
      success: (response: { selectedProfiles: any[] }) => void;
      fail?: (error: any) => void;
      always?: () => void;
    }): void;
    selectChat(settings: {
      title?: string;
      enableSearch?: boolean;
      channelFilter?: string;
      success: (response: { chatLog: any }) => void;
      fail?: (error: any) => void;
      always?: () => void;
    }): void;
  };
}

declare global {
  interface Window {
    Kakao: KakaoStatic;
  }
}

export {};
