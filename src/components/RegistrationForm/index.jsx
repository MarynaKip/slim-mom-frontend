import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authOperations from '../../redux/auth/auth-operations';
import Button from '../Button';
import './styles.css';

const Registration = () => {
    const dispatch = useDispatch();

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(25, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
    });

    const initialValues = {
        name: '',
        email: '',
        password: '',
    };

    return (
        <div className="registration">
            <h1 className="registration__title">Регистрация</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={SignupSchema}
                onSubmit={( values ) => 
                    dispatch(authOperations.signUpUser( values ))}
            >
                {({errors, touched}) => (
                    <>
                        <Form id="reg" className="registration__form" autoComplete="off">
                            <div className="input-wrapper">
                                <div className="box">
                                    <Field
                                        className="registration__name-input"
                                        id="name"
                                        name="name"
                                        placeholder="Имя *"
                                        autoComplete="off"
                                        required
                                    />
                                    { errors.name && touched.name ? (
                                        <div className="registration__error">{errors.name}</div>
                                    ) : null}
                                    <label
                                        htmlFor="name"
                                        className="registration__labe-name"
                                    >
                                    </label>
                                </div>
                                <div className="box">
                                    <Field
                                        className="registration__email-input"
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Ел. адрес *"
                                        autoComplete="off"
                                        required
                                    />
                                    { errors.email && touched.email ? (
                                        <div className="registration__error">{errors.email}</div>
                                    ) : null}
                                    <label
                                        htmlFor="email"
                                        className="registration__labe-email"
                                    >
                                    </label>
                                </div>
                                <div className="box">
                                    <Field
                                        className="registration__password-input"
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Пароль *"
                                        autoComplete="off"
                                        required
                                    />
                                    { errors.password && touched.password ? (
                                        <div className="registration__error">{errors.password}</div>
                                    ) : null}
                                    <label
                                        htmlFor="password"
                                        className="registration__labe-password"
                                    >
                                    </label>
                                </div>
                            </div>
                        </Form>
                        <div className="registration__button-reg">
                            <Button
                                type={'submit'}
                                title={'Регистрация'}
                                form={'reg'}
                            />
                        </div>
                        <div className="registration__button-login">
                            <Link to="/login">
                                <Button
                                    type={'button'}
                                    title={'Вход'}
                                />
                            </Link>
                        </div>
                    </>
                )}
            </Formik>
        </div>
    );
};

export default Registration;
