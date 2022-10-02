import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import { LectureDto } from '../models/lecture';
import {
  getLecturesAsync,
  setCurrentLecture,
  setCurrentLectureAsync,
  setCurrentVideo,
} from '../redux/slice/lectureSlice';
import { useAppDispatch, useAppSelector } from '../redux/store/ConfigureStore';
import { useParams } from 'react-router';
import Loading from '../components/Loading';

const CoursePage = () => {
  const params = useParams();
  const { lecture, lectureLoaded, currentLecture, currentVideo } =
    useAppSelector((state) => state.lecture);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!lecture) dispatch(getLecturesAsync({ courseId: params.course! }));
  }, [dispatch, params!, lecture]);

  useEffect(() => {
    if (currentLecture === 0) {
      dispatch(setCurrentLecture(lecture?.sections[0].lectures[0].id));
      dispatch(setCurrentVideo(lecture?.sections[0].lectures[0].url));
    }

    // navigate((`${currentLecture}`), {replace : true});
    // dont work as intended and manual redirect is used instead)
    if (currentLecture) {
        var str =  window.location.href;
        var lastIndex = str.lastIndexOf("/");
        var path = str.substring(0, lastIndex);
        var new_path = path + `/${currentLecture}`;

        if (str != new_path) window.location.assign(new_path);
    }

    let lectureItem: LectureDto;

    if (lecture) {
      for (const item of lecture?.sections!) {
        lectureItem = item.lectures.find((lec) => lec.id === currentLecture)!;
        if (lectureItem) {
          dispatch(setCurrentVideo(lectureItem.url));
          return;
        }
      }
    }
  }, [currentLecture, dispatch, lecture, navigate]);

  const selectLecture = async (id: number, url: string) => {
        
    dispatch(setCurrentVideo(url));
    await dispatch(
      setCurrentLectureAsync({
        lectureId: id,
        courseId: params.course!,
      }),
    );
    // navigate((`${currentLecture}`), {replace : true});
    // dont work as intended and manual redirect is used instead)
    if (currentLecture) {
        var str =  window.location.href;
        var lastIndex = str.lastIndexOf("/");
        var path = str.substring(0, lastIndex);
        var new_path = path + `/${id}`;
        
        if (str != new_path) window.location.assign(new_path);
    }
  };
  
  if (!lectureLoaded) return <Loading />;

  return (
    <div className="lecture">
      <div className="lecture__sidebar">
        <div className="lecture__sidebar__course">{lecture?.courseName}</div>
        {lecture &&
          lecture.sections.map((section, index) => {
            return (
              <div key={index}>
                <div className="lecture__sidebar__section">
                  {section.sectionName}
                </div>
                {section.lectures.map((lecture, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => selectLecture(lecture.id, lecture.url)}
                      className={
                        lecture.id.toString() === params.lecture
                          ? 'lecture__sidebar__list__item__active'
                          : 'lecture__sidebar__list__item'
                      }
                    >
                      <span className="lecture__sidebar__icon">
                        <FaIcons.FaPlay />
                      </span>
                      <span>{lecture.title}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
      <div className="lecture__video">
        <iframe
          width="100%"
          height="100%"
          title="Learnify"
          src={currentVideo}
        ></iframe>
      </div>
    </div>
  );
};

export default CoursePage;