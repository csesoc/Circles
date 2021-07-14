import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Menu } from 'antd';
import './CourseMenu.less';
const { SubMenu } = Menu;

const MenuItem = ({ courseCode }) => {
  const history = useHistory();
  const planned = useSelector(store => store.courses);
  return (
    <Menu.Item 
      className={"text course-color "} 
      key={courseCode}
      onClick={() => history.push(`/course-selector/${courseCode}`)}
      >
        { courseCode }
    </Menu.Item>
  )
}

// TODO: Adjust dark theme colours
export function CourseMenu() {
  const { courseCode } = useParams();
  const theme = useSelector(store => store.theme)
  const courseOptions = useSelector(store => store.courseOptions);
  const [selectedCourse, setSelected] = React.useState(courseCode);
  return (
    <Menu
      className={'text menu-color'}
      theme={theme}
      // style={{ width: '100%'}}
      selectedKeys={[ selectedCourse ]}
      defaultOpenKeys={['core']}
      mode="inline"
    >
      <SubMenu className={"text"} key="recently-viewed" title="Recently Viewed">
        { courseOptions.recentlyViewed.length === 0
          ? <Menu.Item key={'empty-recently-viewed'} disabled> No courses here (ㆆ_ㆆ) </Menu.Item>
          : courseOptions.recentlyViewed.map(courseCode => <MenuItem courseCode={courseCode}/>) 
        }
      </SubMenu>
      <SubMenu  className={"text"} key="core" title="Core">
        { courseOptions.core.length === 0
          ? <Menu.Item key={'empty-core'} disabled> No courses here (ㆆ_ㆆ) </Menu.Item>
          : courseOptions.core.map(courseCode => <MenuItem courseCode={courseCode}/>) 
        }
      </SubMenu>
      <SubMenu className={"text"} key="electives" title="Electives">
        { courseOptions.electives.length === 0
          ? <Menu.Item key={'empty-electives'} disabled> No courses here (ㆆ_ㆆ) </Menu.Item>
          : courseOptions.electives.map(courseCode => <MenuItem courseCode={courseCode}/>) 
        }
      </SubMenu>
      <SubMenu className={"text"} key={"general-education"} title="General Education">
        { courseOptions.genEds.length === 0
          ? <Menu.Item key={'empty-general-education'} disabled> No courses here (ㆆ_ㆆ) </Menu.Item>
          : courseOptions.genEds.map(courseCode => <MenuItem courseCode={courseCode}/>) 
        }
      </SubMenu>
    </Menu>
  );
}

