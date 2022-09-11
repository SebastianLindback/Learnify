import React, {useEffect, useState, useLayoutEffect} from 'react';
import agent from '../actions/agent';
import { Course } from '../models/course';
import {Row, Col, Card} from "antd";
import * as FaIcons from 'react-icons/fa';

const Courses = () => {
    const [courses, setCourse] = useState<Course[]>([]);
    const [spanVal, setSpanVal] = useState<number>();

    const checkWidth = ():void => {
        setSpanVal(12);
        if (window.innerWidth > 1024) setSpanVal(6);
        if (window.innerWidth > 768) setSpanVal(8);
    };

    useLayoutEffect(() => {
        return () => window.addEventListener("resize", checkWidth);
    },[]);

    useEffect(() => {
      agent.Courses.list().then((response) => {
        setCourse(response);
        checkWidth();
      });
    
    }, []);

    const showStars = (rating: number): [] => {
        const options: any = [];
        for (let i = 1; i < rating; i++) {
          options.push(<FaIcons.FaStar />);
          if (rating - i < 1 && rating - i > 0.3) {
            options.push(<FaIcons.FaStarHalf />);
          }
        }
        return options;
      };
    
    
  return (
    <div className='course'>
        <div className="course__header">
            <h1>What to learn next?</h1>
            <h2>New courses picked just for you...</h2>
        </div>
        <Row gutter={[24,32]}>
            {courses.map((course: Course, index: number) => {
                return (
                    <Col className='gutter-row' span={spanVal}>
                        <Card hoverable cover={<img width="100%" alt='course-cover' src={course.image}></img>}>
                            <div className="course__title">
                                {course.title}
                            </div>
                            <div className="course__instructor">
                                {course.instructor}
                            </div>
                            <div className="course__rating">
                                {course.rating}
                                <span>{showStars(course.rating)}</span>
                            </div>
                            <div className="course__price">
                                {course.price}
                            </div>
                        </Card>
                    </Col>
                )
            } )}
        </Row>
    </div>
  )
}

export default Courses