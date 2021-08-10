import { useAuth0 } from '@auth0/auth0-react';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import { Formik } from 'formik';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { baseURL, endpoints } from 'shared/urls';
import * as Yup from 'yup';
import { history } from '../shared/utils/history';

// interface Props {

// }
interface Props extends RouteComponentProps<{}> {
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}
// Validation Schema for PersonalData form
const ValidationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required.'),
  firstName: Yup.string().required('First Name is required.'),
  lastName: Yup.string().required('Last Name is required.'),
  photo: Yup.string().notRequired(),
});

export const EditProfile: React.FC<Props> = ({ setAuthenticated }) => {
  const { getAccessTokenSilently } = useAuth0();

  return (
    <div>
      <Formik
        initialValues={{
          username: '',
          firstName: '',
          lastName: '',
          photo: ''
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnMount={false}
        validationSchema={ValidationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(async () => {
            try {
              const token = await getAccessTokenSilently();
              const { data } = await axios({
                url: `${baseURL}${endpoints.profile}`,
                method: 'PATCH',
                data: values,
                headers: {
                  Authorization: `Bearer ${token}`,
                }
              });
              if (data.updatedUser.username) {
                setAuthenticated(true);
              }
            } catch (error) {
              console.log(error);
            }

            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values, errors, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => (
          <form className="pb-10" onSubmit={handleSubmit}>
            <div className="">
              <div className="flex align-center justify-between">
                <h3 className="text-lg font-medium mt-6">Complete Your Profile.</h3>
              </div>
              <TextField
                id="username"
                className="mt-6"
                rows={1}
                variant="outlined"
                fullWidth
                inputProps={{
                  style: {
                    boxShadow: 'none'
                  }
                }}
                multiline
                onBlur={handleBlur}
                onChange={handleChange}
                label="Enter Username"
                value={values.username}
                error={!!errors.username}
                helperText={errors.username}
              />
              <TextField
                id="firstName"
                className="mt-10"
                rows={1}
                multiline
                variant="outlined"
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                label="Enter First Name"
                inputProps={{
                  style: {
                    boxShadow: 'none'
                  }
                }}
                value={values.firstName}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
              <TextField
                id="lastName"
                className="mt-10"
                rows={1}
                variant="outlined"
                fullWidth
                multiline
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{
                  style: {
                    boxShadow: 'none'
                  }
                }}
                label="Enter Last Name"
                value={values.lastName}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />

            </div>
            {/* <Divider className="mt-8 -ml-10" /> */}
            <Button className="mt-6" variant="contained" color="primary" type="submit" disabled={isSubmitting}>
              <p className='tracking-widest'>Submit</p>
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
