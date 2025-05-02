// import React from 'react';
// import { Formik, Field, Form } from 'formik';
// import * as Yup from 'yup';

// const SocialLinks = () => {
//   const validationSchema = Yup.object({
//     facebook: Yup.string().url('Invalid URL').required('Facebook URL is required'),
//     twitter: Yup.string().url('Invalid URL').required('Twitter URL is required'),
//     instagram: Yup.string().url('Invalid URL').required('Instagram URL is required'),
//     linkedin: Yup.string().url('Invalid URL').required('LinkedIn URL is required'),
//   });

//   return (
//     <div className="page-content">
//       <h3>Social Media Links</h3>
//       <Formik
//         initialValues={{
//           facebook: '',
//           twitter: '',
//           instagram: '',
//           linkedin: '',
//         }}
//         validationSchema={validationSchema}
//         onSubmit={(values) => {
//           console.log(values);
//         }}
//       >
//         {({ errors, touched }) => (
//           <Form>
//             <div className="mb-3">
//               <label htmlFor="facebook" className="form-label">Facebook URL</label>
//               <Field
//                 type="url"
//                 id="facebook"
//                 name="facebook"
//                 className={`form-control ${touched.facebook && errors.facebook ? 'is-invalid' : ''}`}
//               />
//               {touched.facebook && errors.facebook && (
//                 <div className="invalid-feedback">{errors.facebook}</div>
//               )}
//             </div>

//             <div className="mb-3">
//               <label htmlFor="twitter" className="form-label">Twitter URL</label>
//               <Field
//                 type="url"
//                 id="twitter"
//                 name="twitter"
//                 className={`form-control ${touched.twitter && errors.twitter ? 'is-invalid' : ''}`}
//               />
//               {touched.twitter && errors.twitter && (
//                 <div className="invalid-feedback">{errors.twitter}</div>
//               )}
//             </div>

//             <div className="mb-3">
//               <label htmlFor="instagram" className="form-label">Instagram URL</label>
//               <Field
//                 type="url"
//                 id="instagram"
//                 name="instagram"
//                 className={`form-control ${touched.instagram && errors.instagram ? 'is-invalid' : ''}`}
//               />
//               {touched.instagram && errors.instagram && (
//                 <div className="invalid-feedback">{errors.instagram}</div>
//               )}
//             </div>

//             <div className="mb-3">
//               <label htmlFor="linkedin" className="form-label">LinkedIn URL</label>
//               <Field
//                 type="url"
//                 id="linkedin"
//                 name="linkedin"
//                 className={`form-control ${touched.linkedin && errors.linkedin ? 'is-invalid' : ''}`}
//               />
//               {touched.linkedin && errors.linkedin && (
//                 <div className="invalid-feedback">{errors.linkedin}</div>
//               )}
//             </div>

//             <button type="submit" className="btn btn-primary">Update Links</button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default SocialLinks;
// import React from 'react';
// import { Formik, Field, Form } from 'formik';
// import * as Yup from 'yup';

// const SocialLinks = () => {
//   const validationSchema = Yup.object({
//     facebook: Yup.string().url('Invalid URL').required('Facebook URL is required'),
//     twitter: Yup.string().url('Invalid URL').required('Twitter URL is required'),
//     instagram: Yup.string().url('Invalid URL').required('Instagram URL is required'),
//     linkedin: Yup.string().url('Invalid URL').required('LinkedIn URL is required'),
//   });

//   return (
//     <div className="page-content">
//       <h3>Social Media Links</h3>
//       <Formik
//         initialValues={{
//           facebook: '',
//           twitter: '',
//           instagram: '',
//           linkedin: '',
//         }}
//         validationSchema={validationSchema}
//         onSubmit={(values) => {
//           console.log(values);
//         }}
//       >
//         {({ errors, touched }) => (
//           <Form>
//             <div className="mb-3">
//               <label htmlFor="facebook" className="form-label">Facebook URL</label>
//               <Field
//                 type="url"
//                 id="facebook"
//                 name="facebook"
//                 className={`form-control ${touched.facebook && errors.facebook ? 'is-invalid' : ''}`}
//               />
//               {touched.facebook && errors.facebook && (
//                 <div className="invalid-feedback">{errors.facebook}</div>
//               )}
//             </div>

//             <div className="mb-3">
//               <label htmlFor="twitter" className="form-label">Twitter URL</label>
//               <Field
//                 type="url"
//                 id="twitter"
//                 name="twitter"
//                 className={`form-control ${touched.twitter && errors.twitter ? 'is-invalid' : ''}`}
//               />
//               {touched.twitter && errors.twitter && (
//                 <div className="invalid-feedback">{errors.twitter}</div>
//               )}
//             </div>

//             <div className="mb-3">
//               <label htmlFor="instagram" className="form-label">Instagram URL</label>
//               <Field
//                 type="url"
//                 id="instagram"
//                 name="instagram"
//                 className={`form-control ${touched.instagram && errors.instagram ? 'is-invalid' : ''}`}
//               />
//               {touched.instagram && errors.instagram && (
//                 <div className="invalid-feedback">{errors.instagram}</div>
//               )}
//             </div>

//             <div className="mb-3">
//               <label htmlFor="linkedin" className="form-label">LinkedIn URL</label>
//               <Field
//                 type="url"
//                 id="linkedin"
//                 name="linkedin"
//                 className={`form-control ${touched.linkedin && errors.linkedin ? 'is-invalid' : ''}`}
//               />
//               {touched.linkedin && errors.linkedin && (
//                 <div className="invalid-feedback">{errors.linkedin}</div>
//               )}
//             </div>

//             <button type="submit" className="btn btn-primary">Update Links</button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default SocialLinks;


// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Formik, Field, Form } from 'formik';
// import * as Yup from 'yup';
// import {
//    //   getAllSocialLinksRequest,
//    createSocialLink,
//    updateSocialLink,
//    deleteSocialLink,
// } from '../../store/socialLinks/actions';

// const validationSchema = Yup.object({
//    facebook: Yup.string().url('Invalid URL').required('Facebook URL is required'),
//    twitter: Yup.string().url('Invalid URL').required('Twitter URL is required'),
//    instagram: Yup.string().url('Invalid URL').required('Instagram URL is required'),
//    linkedin: Yup.string().url('Invalid URL').required('LinkedIn URL is required'),
// });

// const SocialLinks = () => {
//    const dispatch = useDispatch();
//    //   const { socialLinks } = useSelector((state) => state.SocialLinks);
//    const socialLinks = useSelector((state) => state.SocialLinks?.socialLinks || []);

//    console.log("socialLinks", socialLinks)

//    //   useEffect(() => {
//    //     dispatch(getAllSocialLinksRequest());
//    //   }, [dispatch]);

//    const getInitialValues = () => {
//       const initial = {
//          facebook: '',
//          twitter: '',
//          instagram: '',
//          linkedin: '',
//       };
//       socialLinks?.forEach((link) => {
//          initial[link.platform.toLowerCase()] = link.url;
//       });
//       return initial;
//    };

//    const handleSubmit = (values) => {
//       console.log("values" , values)
//       Object.entries(values).forEach(([platform, url]) => {
//          const existing = socialLinks?.find(
//             (link) => link.platform.toLowerCase() === platform
//          );

//          if (existing) {
//             dispatch(
//                updateSocialLink({
//                   socialLinkData: {
//                      socialLinkId: existing.socialLinkId,
//                      platform: platform.charAt(0).toUpperCase() + platform.slice(1),
//                      url,
//                   },
//                })
//             );
//          } else {
//             dispatch(
//                createSocialLink({
//                   socialLinkData: {
//                      platform: platform.charAt(0).toUpperCase() + platform.slice(1),
//                      url,
//                   },
//                })
//             );
//          }
//       });
//    };

//    const handleDelete = (socialLinkId) => {
//       dispatch(
//          deleteSocialLink({
//             socialLinkId,
//          })
//       );
//    };

//    return (
//       <div className="page-content">
//          <h3>Social Media Links</h3>
//          <Formik
//             enableReinitialize
//             initialValues={getInitialValues()}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//          >
//             {({ errors, touched }) => (
//                <Form>
//                   {['facebook', 'twitter', 'instagram', 'linkedin'].map((platform) => (
//                      <div className="mb-3 d-flex align-items-center" key={platform}>
//                         <div className="flex-grow-1 me-2">
//                            <label htmlFor={platform} className="form-label text-capitalize">
//                               {platform} URL
//                            </label>
//                            <Field
//                               type="url"
//                               id={platform}
//                               name={platform}
//                               className={`form-control ${touched[platform] && errors[platform] ? 'is-invalid' : ''
//                                  }`}
//                            />
//                            {touched[platform] && errors[platform] && (
//                               <div className="invalid-feedback">{errors[platform]}</div>
//                            )}
//                         </div>

//                         {/* Delete Button */}
//                         {socialLinks?.some(
//                            (link) => link.platform.toLowerCase() === platform
//                         ) && (
//                               <button
//                                  type="button"
//                                  className="btn btn-danger mt-4"
//                                  onClick={() => {
//                                     const linkToDelete = socialLinks.find(
//                                        (link) => link.platform.toLowerCase() === platform
//                                     );
//                                     handleDelete(linkToDelete.socialLinkId);
//                                  }}
//                               >
//                                  Delete
//                               </button>
//                            )}
//                      </div>
//                   ))}

//                   <button type="submit" className="btn btn-primary">
//                      Update Links
//                   </button>
//                </Form>
//             )}
//          </Formik>
//       </div>
//    );
// };

// export default SocialLinks;


// import React , {useEffect} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Formik, Field, Form } from 'formik';
// import * as Yup from 'yup';
// import {
//    getAllSocialLinks,
//    // createSocialLink,
//    // updateSocialLink,
//    deleteSocialLink,
// } from '../../store/socialLinks/actions';
// import axios from 'axios';


// const validationSchema = Yup.object({
//    facebook: Yup.string().url('Invalid URL').required('Facebook URL is required'),
//    twitter: Yup.string().url('Invalid URL').required('Twitter URL is required'),
//    instagram: Yup.string().url('Invalid URL').required('Instagram URL is required'),
//    linkedin: Yup.string().url('Invalid URL').required('LinkedIn URL is required'),
// });
// const createSocialLink = (data) => {
//    const token = localStorage.getItem('access-token'); 
//    console.log("token-----------" , token)
//    return axios.post(
//       `${import.meta.env.VITE_APP_API_URL}/api/v1/social-links`,
//       data,
//       {
//          headers: {
//             Authorization: `Bearer ${token}`,
//          },
//       }
//    );
// };


// const updateSocialLink = (data) => {
//    const token = localStorage.getItem('access-token'); 
//    console.log("token-----------" , token)
//    return axios.post(
//       `${import.meta.env.VITE_APP_API_URL}/api/v1/social-links`,
//       data,
//       {
//          headers: {
//             Authorization: `Bearer ${token}`,
//          },
//       }
//    );
// };

// const getSocialLinks = (id) => {
//    console.log("id------", id)
//    const token = localStorage.getItem('access-token'); 
//    return axios.get(
//       `${import.meta.env.VITE_APP_API_URL}/api/v1/social-links/${id}`,
//       {
//          headers: {
//             Authorization: `Bearer ${token}`,
//          },
//       }
//    );
// };


// const SocialLinks = () => {
//    const dispatch = useDispatch();
//    const {socialLinks} = useSelector((state) => state.socialLinksReducer);

//    console.log("socialLinks" , socialLinks)

//    // const getInitialValues = () => {
//    //    const initial = {
//    //       facebook: '',
//    //       twitter: '',
//    //       instagram: '',
//    //       linkedin: '',
//    //    };
//    //    (socialLinks || []).forEach((link) => {
//    //       initial[link.platform.toLowerCase()] = link.url;
//    //    });      
//    //    return initial;
//    // };

//    // const getInitialValues = () => {
//    //    if (!socialLinks || socialLinks.length === 0) return {
//    //       facebook: '',
//    //       twitter: '',
//    //       instagram: '',
//    //       linkedin: '',
//    //    };

//    //    const link = socialLinks[0];  
//    //    return {
//    //       facebook: link.facebook || '',
//    //       twitter: link.twitter || '',
//    //       instagram: link.instagram || '',
//    //       linkedin: link.linkedin || '',
//    //    };
//    // };

//    const getInitialValues = () => {
//       return {
//         facebook: socialLinks?.facebook || '',
//         twitter: socialLinks?.twitter || '',
//         instagram: socialLinks?.instagram || '',
//         linkedin: socialLinks?.linkedin || '',
//       };
//     };




//    // const handleSubmit = (values) => {
//    //    Object.entries(values).forEach(([platform, url]) => {
//    //       console.log("platform" , platform)
//    //       console.log("url" , url)
//    //       const existing = socialLinks?.find(
//    //          (link) => link.platform.toLowerCase() === platform
//    //       );
//    //       console.log("existing" , existing)

//    //       if (existing) {
//    //          dispatch(
//    //             updateSocialLink({
//    //                socialLinkData: {
//    //                   socialLinkId: existing.socialLinkId,
//    //                   platform: platform.charAt(0).toUpperCase() + platform.slice(1),
//    //                   url,
//    //                },
//    //             })
//    //          );
//    //       } else {
//    //          dispatch(
//    //             createSocialLink({
//    //                socialLinkData: {
//    //                   platform: platform.charAt(0).toUpperCase() + platform.slice(1),
//    //                   url,
//    //                },
//    //             })
//    //          );
//    //       }
//    //    });
//    // };

//    // const handleSubmit = (values) => {
//    //    const data = {
//    //       facebook: values.facebook,
//    //       twitter: values.twitter,
//    //       instagram: values.instagram,
//    //       linkedin: values.linkedin,
//    //    };

//    //    dispatch(createSocialLink(data));
//    // };


//    const handleSubmit = (values) => {
//       const id = socialLinks?.id;

//       if (id) {
//         // Update existing links
//         dispatch(
//           updateSocialLink({
//             socialLinkData: {
//               id,
//               ...values,  // send facebook, twitter, instagram, linkedin
//             },
//           })
//         );
//       } else {
//         // Create new links
//         dispatch(
//           createSocialLink({
//             socialLinkData: {
//               ...values,
//             },
//           })
//         );
//       }
//     };


//    const handleDelete = (socialLinkId) => {
//       dispatch(
//          deleteSocialLink({
//             socialLinkId,
//          })
//       );
//    };

//    useEffect(() => {
//       const id = '1'; // or get this dynamically
//       getSocialLinks(id)
//          .then((response) => {
//             const fetchedLink = response.data.data.socialLink; // ✅ get the socialLink object
//             console.log('Fetched Link:', fetchedLink);

//             // Dispatching — assuming you want to set it as an array (like your old code expects)
//             dispatch(getAllSocialLinks([fetchedLink])); 
//          })
//          .catch((error) => {
//             console.error('Error fetching social link', error);
//          });
//    }, [dispatch]);



//    return (
//       <div className="page-content">
//          <h3>Social Media Links</h3>
//          <Formik
//             enableReinitialize
//             initialValues={getInitialValues()}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//          >
//             {({ errors, touched }) => (
//                <Form>
//                   {['facebook', 'twitter', 'instagram', 'linkedin'].map((platform) => (
//                      <div className="mb-3 d-flex align-items-center" key={platform}>
//                         <div className="flex-grow-1 me-2">
//                            <label htmlFor={platform} className="form-label text-capitalize">
//                               {platform} URL
//                            </label>
//                            <Field
//                               type="url"
//                               id={platform}
//                               name={platform}
//                               className={`form-control ${touched[platform] && errors[platform] ? 'is-invalid' : ''
//                                  }`}
//                            />
//                            {touched[platform] && errors[platform] && (
//                               <div className="invalid-feedback">{errors[platform]}</div>
//                            )}
//                         </div>

//                         {socialLinks?.some(
//                            (link) => link.platform.toLowerCase() === platform
//                         ) && (
//                               <button
//                                  type="button"
//                                  className="btn btn-danger mt-4"
//                                  onClick={() => {
//                                     const linkToDelete = socialLinks.find(
//                                        (link) => link.platform.toLowerCase() === platform
//                                     );
//                                     handleDelete(linkToDelete.socialLinkId);
//                                  }}
//                               >
//                                  Delete
//                               </button>
//                            )}
//                      </div>
//                   ))}

//                   <button type="submit" className="btn btn-primary">
//                      Update Links
//                   </button>
//                </Form>
//             )}
//          </Formik>
//       </div>
//    );
// };

// export default SocialLinks;


// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Formik, Field, Form } from 'formik';
// import * as Yup from 'yup';
// import {
//    getAllSocialLinks,
//    // createSocialLink,
//    // updateSocialLink,
//    deleteSocialLink,
// } from '../../store/socialLinks/actions';
// import axios from 'axios';
// import { getAccessToken } from "../../../src/network/storageUtils"

// const validationSchema = Yup.object({
//    facebook: Yup.string().url('Invalid URL').required('Facebook URL is required'),
//    twitter: Yup.string().url('Invalid URL').required('Twitter URL is required'),
//    instagram: Yup.string().url('Invalid URL').required('Instagram URL is required'),
//    linkedin: Yup.string().url('Invalid URL').required('LinkedIn URL is required'),
// });

// const getSocialLinks = (id) => {
//    //   const token = localStorage.getItem('access-token');
//    const token = getAccessToken();
//    console.log("token------", token)
//    return axios.get(
//       `${import.meta.env.VITE_APP_API_URL}/api/v1/social-links/${id}`,
//       {
//          headers: {
//             Authorization: `Bearer ${token}`,
//          },
//       }
//    );
// };

// const createSocialLink = (data) => {
//    const token = getAccessToken();

//    return axios.post(
//       `${import.meta.env.VITE_APP_API_URL}/api/v1/social-links`,
//       data,
//       {
//          headers: {
//             Authorization: `Bearer ${token}`,
//          },
//       }
//    );
// };

// const updateSocialLink = (data) => {
//    const token = getAccessToken();

//    return axios.post(
//       `${import.meta.env.VITE_APP_API_URL}/api/v1/social-links`,
//       data,
//       {
//          headers: {
//             Authorization: `Bearer ${token}`,
//          },
//       }
//    );
// };

// const SocialLinks = () => {
//    const dispatch = useDispatch();
//    const { socialLinks } = useSelector((state) => state.socialLinksReducer);

//    console.log('socialLinks', socialLinks);

//    const getInitialValues = () => {
//       return {
//          facebook: socialLinks?.facebook || '',
//          twitter: socialLinks?.twitter || '',
//          instagram: socialLinks?.instagram || '',
//          linkedin: socialLinks?.linkedin || '',
//       };
//    };

//    // const handleSubmit = (values) => {
//    //    console.log('Submitted values:', values);

//    //    // If there is an id, update existing, else create
//    //    if (socialLinks?.id) {
//    //       updateSocialLink({ id: socialLinks.id, ...values })
//    //          .then((res) => {
//    //             console.log('Updated:', res.data);
//    //             alert('Links updated!');
//    //          })
//    //          .catch((err) => {
//    //             console.error('Error updating', err);
//    //          });
//    //    } else {
//    //       createSocialLink(values)
//    //          .then((res) => {
//    //             console.log('Created:', res.data);
//    //             alert('Links created!');
//    //          })
//    //          .catch((err) => {
//    //             console.error('Error creating', err);
//    //          });
//    //    }
//    // };


//    const handleSubmit = (values) => {
//       console.log('Submitted values:', values);

//       const token = getAccessToken();
//       const requestData = { ...values };

//       // If there is an id, update existing; otherwise create a new one
//       if (socialLinks?.id) {
//          // Update the existing social link
//          updateSocialLink({ id: socialLinks.id, ...requestData })
//             .then((res) => {
//                console.log('Successfully updated:', res.data);
//                alert('Links updated!');

//                // After updating, fetch the updated social links
//                getSocialLinks(2)
//                   .then((response) => {
//                      console.log('Updated social links fetched:', response.data.data.socialLink);
//                      // Dispatch to update the Redux store
//                      dispatch(getAllSocialLinks(response.data.data.socialLink));
//                   })
//                   .catch((error) => {
//                      console.error('Error fetching updated social links', error);
//                   });
//             })
//             .catch((err) => {
//                console.error('Error during update', err);
//             });
//       } else {
//          // Create a new social link
//          createSocialLink(requestData)
//             .then((res) => {
//                console.log('Successfully created:', res.data);
//                alert('Links created!');

//                // After creating, fetch the updated social links
//                getSocialLinks(2)
//                   .then((response) => {
//                      console.log('New social links fetched:', response.data.data.socialLink);
//                      // Dispatch to update the Redux store
//                      dispatch(getAllSocialLinks(response.data.data.socialLink));
//                   })
//                   .catch((error) => {
//                      console.error('Error fetching social links', error);
//                   });
//             })
//             .catch((err) => {
//                console.error('Error during creation', err);
//             });
//       }
//    };



//    const handleDelete = (platform) => {
//       // Clear only the specific platform link
//       const updatedLinks = { ...socialLinks, [platform]: '' };

//       updateSocialLink(updatedLinks)
//          .then((res) => {
//             console.log('Deleted link:', res.data);
//             alert(`${platform} link deleted!`);
//          })
//          .catch((err) => {
//             console.error('Error deleting link', err);
//          });
//    };

//    useEffect(() => {
//       getSocialLinks(2)
//          .then((response) => {
//             console.log('Fetched Links:', response.data.data.socialLink);
//             dispatch(getAllSocialLinks(response.data.data.socialLink));
//          })
//          .catch((error) => {
//             console.error('Error fetching social links', error);
//          });
//    }, [dispatch]);

//    return (
//       <div className="page-content">
//          <h3>Social Media Links</h3>
//          <Formik
//             enableReinitialize
//             initialValues={getInitialValues()}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//          >
//             {({ errors, touched }) => (
//                <Form>
//                   {['facebook', 'twitter', 'instagram', 'linkedin'].map((platform) => (
//                      <div className="mb-3 d-flex align-items-center" key={platform}>
//                         <div className="flex-grow-1 me-2">
//                            <label htmlFor={platform} className="form-label text-capitalize">
//                               {platform} URL
//                            </label>
//                            <Field
//                               type="url"
//                               id={platform}
//                               name={platform}
//                               className={`form-control ${touched[platform] && errors[platform] ? 'is-invalid' : ''
//                                  }`}
//                            />
//                            {touched[platform] && errors[platform] && (
//                               <div className="invalid-feedback">{errors[platform]}</div>
//                            )}
//                         </div>

//                         {socialLinks?.[platform] && (
//                            <button
//                               type="button"
//                               className="btn btn-danger mt-4"
//                               onClick={() => handleDelete(platform)}
//                            >
//                               Delete
//                            </button>
//                         )}
//                      </div>
//                   ))}

//                   <button type="submit" className="btn btn-primary">
//                      Update Links
//                   </button>
//                </Form>
//             )}
//          </Formik>
//       </div>
//    );
// };

// export default SocialLinks;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { getAllSocialLinks } from '../../store/socialLinks/actions';
import axios from 'axios';
import { getAccessToken } from "../../../src/network/storageUtils";
import { showToastr } from '../../utils/helpers';

const validationSchema = Yup.object({
   facebook: Yup.string().url('Invalid URL').required('Facebook URL is required'),
   twitter: Yup.string().url('Invalid URL').required('Twitter URL is required'),
   instagram: Yup.string().url('Invalid URL').required('Instagram URL is required'),
   linkedin: Yup.string().url('Invalid URL').required('LinkedIn URL is required'),
});

const getSocialLinks = (id) => {
   const token = getAccessToken();
   return axios.get(
      `${import.meta.env.VITE_APP_API_URL}/api/v1/social-links/${id}`,
      {
         headers: { Authorization: `Bearer ${token}` },
      }
   );
};

const createSocialLink = (data) => {
   const token = getAccessToken();
   return axios.post(
      `${import.meta.env.VITE_APP_API_URL}/api/v1/social-links`,
      data,
      {
         headers: { Authorization: `Bearer ${token}` },
      }
   );
};

const deleteSocialLink = (data) => {
   const token = getAccessToken();
   return axios.delete(
      `${import.meta.env.VITE_APP_API_URL}/api/v1/social-links`,
      {
         headers: { Authorization: `Bearer ${token}` },
         data,
      }
   );
};

const updateSocialLink = (data) => {
   const token = getAccessToken();
   return axios.put(
      `${import.meta.env.VITE_APP_API_URL}/api/v1/social-links`,
      data,
      {
         headers: { Authorization: `Bearer ${token}` },
      }
   );
};

const SocialLinks = () => {
   const dispatch = useDispatch();
   const { socialLinks } = useSelector((state) => state.socialLinksReducer);
   useEffect(() => {
      if (socialLinks && socialLinks.id) return;
      getSocialLinks(2)
         .then((response) => {
            dispatch(getAllSocialLinks(response.data.data.socialLink));
         })
         .catch((error) => {
            console.error('Error fetching social links', error);
         });
   }, [dispatch]);

   const handleSubmit = (values) => {
      if (socialLinks?.id) {
         updateSocialLink({ id: socialLinks.id, ...values })
            .then((res) => {
               showToastr({ message: 'Links updated successfully!', type: 'success' });
               getSocialLinks(2)
                  .then((response) => {
                     dispatch(getAllSocialLinks(response.data.data.socialLink));
                  })
                  .catch((error) => {
                     console.error('Error fetching updated social links', error);
                  });
            })
            .catch((err) => {
               console.error('Error during update', err);
            });
      } else {
         createSocialLink(values)
            .then((res) => {
               showToastr({ message: 'Links created successfully!', type: 'success' });
               getSocialLinks(2)
                  .then((response) => {
                     dispatch(getAllSocialLinks(response.data.data.socialLink));
                  })
                  .catch((error) => {
                     console.error('Error fetching social links', error);
                  });
            })
            .catch((err) => {
               console.error('Error during creation', err);
            });
      }
   };

   const handleDelete = (platform) => {
      if (!socialLinks || !socialLinks.id) {
         console.error("No social links found to delete.");
         showToastr({ message: 'No social link found to delete.', type: 'warning' });
         return;
      }
         const deleteData = {
         socialLinkId: Number(socialLinks.id), 
         platform: platform, 
      };


      deleteSocialLink(deleteData)
            .then((res) => {
               showToastr({ message: `${platform} link deleted successfully!`, type: 'success' });
               getSocialLinks(2)
                  .then((response) => {
                     dispatch(getAllSocialLinks(response.data.data.socialLink));
                  })
                  .catch((error) => {
                     console.error('Error fetching updated social links', error);
                     showToastr({ message: 'Failed to fetch updated links.', type: 'error' });
                  });
            })
            .catch((err) => {
               console.error('Error during update', err);
               showToastr({ message: `Error deleting ${platform} link.`, type: 'error' });
            });
   };
   
   


   return (
      <div className="page-content">
         <h3>Social Media Links</h3>
         <Formik
            enableReinitialize
            initialValues={{
               facebook: socialLinks?.facebook || '',
               twitter: socialLinks?.twitter || '',
               instagram: socialLinks?.instagram || '',
               linkedin: socialLinks?.linkedin || '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
         >
            {({ errors, touched }) => (
               <Form>
                  {['facebook', 'twitter', 'instagram', 'linkedin'].map((platform) => (
                     <div className="mb-3 d-flex align-items-center" key={platform}>
                        <div className="flex-grow-1 me-2">
                           <label htmlFor={platform} className="form-label text-capitalize">
                              {platform} URL
                           </label>
                           <Field
                              type="url"
                              id={platform}
                              name={platform}
                              className={`form-control ${touched[platform] && errors[platform] ? 'is-invalid' : ''}`}
                           />
                           {touched[platform] && errors[platform] && (
                              <div className="invalid-feedback">{errors[platform]}</div>
                           )}
                        </div>

                        {socialLinks?.[platform] && (
                           <button
                              type="button"
                              className="btn btn-danger mt-4"
                              onClick={() => handleDelete(platform)}
                           >
                              Delete
                           </button>
                        )}
                     </div>
                  ))}

                  <button type="submit" className="btn btn-primary">
                     Update Links
                  </button>
               </Form>
            )}
         </Formik>
      </div>
   );
};

export default SocialLinks;
