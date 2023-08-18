function logout(reDirectTo: Function) {
  if(!reDirectTo){
    return;
  }
  document.cookie = "auth_token=; expires=Thu, 22 Mar 2003 00:00:00 UTC; path=/;";
  reDirectTo();
  return;
}

export default logout;
