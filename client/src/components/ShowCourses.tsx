import { Card, Col } from 'antd';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import agent from '../actions/agent';
import * as FaIcons from 'react-icons/fa';
import { Course } from '../models/course';
import { Link } from 'react-router-dom';

interface Props {
    course : Course;
    
}

function ShowCourses({course} : Props) {
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
        checkWidth();
    }, []);

    const showStars = (rating: number): [] => {
        const options: any = [];
        for (let i = 1; i < rating; i++) {
          options.push(<FaIcons.FaStar key={i} />);
          if (rating - i < 1 && rating - i > 0.3) {
            options.push(<FaIcons.FaStarHalf key={i + 1} />);
          }
        }
        return options;
      };
    const addToCart = (courseId : string) => {
        agent.Basket.addItem(courseId).catch((error) => console.log(error));
    };
    return (
        <Col className='gutter-row' span={spanVal} >
            
                <Card hoverable cover={<img width="100%" alt='course-cover' src={course.image}></img>}>
                <Link to={`/course/${course.id}`}>
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
                    </Link>
                    <div className="course__bottom">
                        <div className="course__bottom__price">
                            {course.price}
                        </div>
                        <div onClick={() => addToCart(course.id)} className="course__bottom__cart">Add to cart</div>
                    </div>
                    
                </Card>
        </Col>
    )
}

export default ShowCourses