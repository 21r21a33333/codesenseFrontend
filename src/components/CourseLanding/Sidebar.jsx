import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu, sidebarClasses } from "react-pro-sidebar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CourseLeaderboardTable from "../CourseLeaderboard/CourseLeaderboardTable";
import { Modal, Button } from "antd"; // Assuming you have Ant Design installed for modal
import { TbDeviceDesktopAnalytics } from "react-icons/tb";


function SidebarComponent() {
  const CourseData = useSelector((state) => state.course.course);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="w-84 sticky top-[64px] h-sidebar w-[300px] min-w-[300px] cursor-pointer self-start overflow-y-scroll bg-gray-50 dark:bg-gray-800">
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: "white",
          },
        }}
        style={{ height: "calc(100vh - 64px)", width: "300px" }}
      >
       {/* Button to open CourseLeaderboardTable as modal */}
       {/* <Button type="primary" >
          Leaderboard */}
          <div className="flex justify-end align-center"> 
          <TbDeviceDesktopAnalytics onClick={handleOpenModal} className="mt-6 mx-2 w-6 h-6 hover:scale-125 transition delay-150 duration-300 ease-in-out"/>
          </div>
        {/* </Button> */}
        <Menu className="my-1">
          {CourseData.modules &&
            CourseData.modules.map((module) => (
              <SubMenu key={module.module_title} label={module.module_title} className="hover:scale-105 transition delay-150 duration-300 ease-in-out">
                {module.lessons.map((lesson) => (
                  <MenuItem key={lesson._id} className="hover:scale-105 transition delay-150 duration-300 ease-in-out">
                    <Link to={`${module._id}/${lesson._id}`}>
                      <div className="flex">
                        {!lesson.problem_id ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                            />
                          </svg>
                        )}
                        <p className="mx-1">
                          {lesson.lesson_title.slice(0, 20)}
                        </p>
                      </div>
                    </Link>
                  </MenuItem>
                ))}
              </SubMenu>
            ))}
        </Menu>

       

        {/* Modal for CourseLeaderboardTable */}
        <Modal
          title="Course Leaderboard"
          visible={showModal}
          onCancel={handleCloseModal}
          footer={null}
          destroyOnClose
          width={800} // Adjust width as needed
        >
          <CourseLeaderboardTable courseid={CourseData.courseid}/>
        </Modal>
      </Sidebar>
    </div>
  );
}

export default SidebarComponent;
