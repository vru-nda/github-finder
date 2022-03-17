import { useLocation, useNavigate } from 'react-router-dom';

export function withRouter(Child) {
  return (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    return <Child {...props} navigate={navigate} location={location} />;
  };
}
