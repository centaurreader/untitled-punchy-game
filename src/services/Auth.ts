class GoogleAuth {
  private readonly SCOPE = 'https://www.googleapis.com/auth/userinfo.email';
  private provider: any;

  constructor() {
    this.init();
  }

  isAuthenticated(): boolean {
    return !!(window as any).firebase.auth().currentUser;
  }

  private init() {
    this.provider = new (window as any).firebase.auth.GoogleAuthProvider();
    this.provider.addScope(this.SCOPE);
  }

  getCurrentUser() {
    return (window as any).firebase.auth().currentUser;
  }

  signIn(): Promise<null> {
    if (!this.isAuthenticated()) {
      return (window as any).firebase.auth()
        .signInWithPopup(this.provider).then(() => {
          return Promise.resolve(null);
        });
    }
    return Promise.resolve(null);
  }

  signOut() {
    return (window as any).firebase.auth().signOut();
  }
}

export default new GoogleAuth();
