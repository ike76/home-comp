export default () => Component => {
  function RequiresLogin(props) {
    return <Component />;
  }
  return RequiresLogin;
};
