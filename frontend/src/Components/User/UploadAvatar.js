import { useEffect, useState } from 'react';
import UserLayout from '../../Layouts/userLayout.js';
import { useUploadAvatarMutation } from '../../redux/APIS/userApi.js';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
export default function UploadAvatar() {
  const { user } = useSelector(state => state.user);
  const [file, setFile] = useState('');
  const [image, setImage] = useState(
    user?.avatar?.url ? user?.avatar?.url : '/images/default_avatar.jpg'
  );

  const [uploadAvatar, { data, isSuccess, isLoading, error }] =
    useUploadAvatarMutation();
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success('Successfully uploaded');
    }
  }, [error, isSuccess]);
  console.log(data);
  /*
    1 .  GET THE IMAGES DETAILS
      console.log(e.target.files[0]);
    2 . SET THE FILE
    3 . Preview the file
      3.1 Read the file and convert into url readAsDataURL

    **/

  function previewFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
  }

  function onHandleChange(e) {
    console.log(e.target.files[0]);

    const file = e.target.files[0];
    setFile(file);
    previewFile(file);
  }
  async function onSubmit(e) {
    e.preventDefault();
    const body = { image };
    await uploadAvatar(body);
  }
  return (
    <UserLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form
            className="shadow rounded bg-body update_container"
            onSubmit={onSubmit}
          >
            <h2 className="mb-4">Upload Avatar</h2>

            <div className="mb-3">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <figure className="avatar item-rtl">
                    <img src={image} className="rounded-circle" alt="image" />
                  </figure>
                </div>
                <div className="input-foam">
                  <label className="form-label" for="customFile">
                    Choose Avatar
                  </label>
                  <input
                    type="file"
                    name="avatar"
                    className="form-control"
                    id="customFile"
                    accept="images/*"
                    onChange={onHandleChange}
                  />
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="update-btn btn"
              disabled={isLoading}
            >
              {isLoading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}
