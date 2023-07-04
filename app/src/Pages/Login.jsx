import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyGetTokenQuery } from '../Redux/Api';
import { setToken } from '../Redux/Slices';
import Centered from '../Layouts/Centered';
import './Login.css';

export default function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, sessionId } = useSelector((state) => state.tokenReducer);

  const [getToken, { data: tokenResponse = null }] = useLazyGetTokenQuery();
  const thing1Ref = useRef();
  const thing2Ref = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    const thing1 = thing1Ref.current.value;
    const thing2 = thing2Ref.current.value;
    getToken({ email: thing1, code: thing2 });
  }

  useEffect(() => {
    if (tokenResponse) dispatch(setToken(tokenResponse));
  }, [tokenResponse]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!!token && !!sessionId) navigate("/edit");
  }, [token, sessionId]); // eslint-disable-line react-hooks/exhaustive-deps

  return <Centered>
    Please provide the seeds of your own destruction.
    <form>
      <input type="text" id="thing1" ref={thing1Ref} /><br />
      <input type="text" id="thing2" ref={thing2Ref} /><br />
      <input type="submit" value="S U B M I T" onClick={handleLogin} />
    </form>
  </Centered>

}