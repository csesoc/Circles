import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Tag, Alert } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CourseTag } from '../../components/courseTag/CourseTag';
import { getCourseById } from '../../actions/updateCourses';
import { addUnplannedCourse, setUnplannedCourses } from '../../actions/userAction';
import classes from './CourseDescription.module.css';

export default function CourseDescription(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const course = useSelector(state => state.updateCourses.course);
  // REVIEW COMMENT: Handle checks for course here instead of inside the component
  if (!course) {
    console.log("Need to handle state error here.");
  }

  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(getCourseById(id));
    props.setCourseId(id);
  }, [id]);

  const addToPlanner = () => {
    // dispatch(addUnplannedCourse(id));
    setShow(true);
    dispatch(setUnplannedCourses(id));
  }
  
  const hideAlert = () => {
    setShow(false);
  }

  return (
    <div className={ classes.cont }>
      <div className={ classes.contents }>
        {
          show &&
          <Alert message={`Yay, you've successfully added ${id} to your planner!` } type="success" className={`${classes.alert}` } style={{ marginBottom: '1rem'}} showIcon closable afterClose={ hideAlert }/>
        }
        <div className={ classes.top }>
          <div>
            <h2 className={ `${classes.code} text` }>{ id }</h2>
            <h1 className={ `${classes.name} text` }>{ course.name }</h1>
          </div>
          <Button className={ classes.btn } onClick={ addToPlanner } type="primary" icon={<PlusOutlined />}>
            Add to planner
          </Button>
        </div>
        <h3 className={ `${classes.subhead} text` }>Overview</h3>
        <p className={`text`}>{ course.overview }</p>
        <h3 className={ `${classes.subhead} text` }>Prerequisites</h3>
        {
          course.prereq && course.prereq.length > 0 ?
          ( 
            <div className={`text ${classes.flex}`}>
              { course.prereq.map(courseCode => { return <CourseTag name={courseCode}/> })}
            </div>
          )
          :
          <p className={`text`}>None</p>
        }
        <h3 className={ `${classes.subhead} text` }>Unlocks these next courses</h3>
        {
          course.next && course.next.length > 0 ?
          course.next.map(courseCode => {
            <CourseTag name={courseCode}/>
          })
          :
          <p className={`text`}>None</p>
        }
      </div>
      <div>
        <h3 className={ `${classes.subhead} text` }>Faculty</h3>
        <p className={`text`}>{ course.faculty }</p>
        <h3 className={ `${classes.subhead} text` }>School</h3>
        <p className={`text`}>{ course.school }</p>
        <h3 className={ `${classes.subhead} text` }>Study Level</h3>
        <p className={`text`}>{ course.level }</p>
        <h3 className={ `${classes.subhead} text` }>Offering Terms</h3>
        <div className={ classes.list }>
          {
            course.terms && course.terms.map(term => {
              return (
                <Tag className={`text`}>{ isNaN(term) ? `${term} Term` : `Term ${term}` }</Tag>
              )
            })
          }
        </div>
        <h3 className={ `${classes.subhead} text` }>Campus</h3>
        <p className={`text`}>{ course.campus }</p>
      </div>
    </div>
  );
}