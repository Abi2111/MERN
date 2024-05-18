import Header from '../Components/Header.js';
import Sidebar from '../Components/User/Sidebar.js';

export default function UserLayout({ children }) {
  return (
    <>
      <Header />
      <div>
        <div className="mt-2 mb-4 py-4">
          <h2 className="text-center fw-bolder">User settings</h2>
        </div>
        <div className="container">
          <div className="row justify-content-around">
            <div className="col-12 col-lg-3">
              <Sidebar />
            </div>
            <div className="col-12 col-lg-8 user-dashboard">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
