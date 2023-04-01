import React, { useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import SAlert from '../../components/Alert';
import { useNavigate } from 'react-router-dom';
import SForm from './form';
import { postData } from '../../utils/fetch';
import { useDispatch } from 'react-redux';
import { authActions } from '../../redux/auth/authSlice';

function PageSignin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [alert, setAlert] = useState({
    status: false,
    message: '',
    type: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await postData('/cms/auth/signin', form);

      dispatch(
        authActions.userLogin({
          token: res.data.data.token,
          role: res.data.data.role,
          email: res.data.data.email,
        })
      );
      setIsLoading(false);
      navigate('/');
    } catch (err) {
      setIsLoading(false);
      setAlert({
        type: 'danger',
        message: err?.response?.data?.msg ?? 'Internal Server Error',
        status: true,
      });
    }
  };

  return (
    <Container md={12} className="my-5">
      <div className="m-auto" style={{ width: '50%' }}>
        {alert.status && <SAlert message={alert.message} type={alert.type} />}
      </div>
      <Card style={{ width: '50%' }} className="m-auto mt-5">
        <Card.Body>
          <Card.Title className="text-center">Form Signin</Card.Title>
          <SForm
            form={form}
            handleChange={handleChange}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PageSignin;
