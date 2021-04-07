let assignedRole = '';

export const jwtDecoder = (token: string) => {
  let base64Url = token.split('.')[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

export const role = (userRole: string) => assignedRole = userRole

export const getRole = () => assignedRole

export const removeRole = () => assignedRole = '';


export function useProvideAuth(values?: any) {

  const fakeAuth = {
    isAuthenticated: false,
    signin(cb: { (): void; (...args: any[]): void; }) {
      fakeAuth.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    },
    signout(cb: { (): void; (...args: any[]): void; }) {
      fakeAuth.isAuthenticated = false;
      setTimeout(cb, 100);
    }
  };
  const signin = (cb: () => void) => {
    return fakeAuth.signin(() => {
      cb();
    });
  };

  const signout = (cb: () => void) => {
    return fakeAuth.signout(() => {
      cb();
    });
  };

  return {
    signin,
    signout
  };
}
