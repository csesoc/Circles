import React from 'react';
import { useHistory } from 'react-router-dom';
import { Select } from 'antd';
import { getSearchResult } from './courseProvider';
// import debounce from 'lodash/debounce';

const { Option } = Select;

export function SearchCourse() {
  const history = useHistory();
  const [input, setInput] = React.useState('')
  const [courses, setCourses] = React.useState([])

  useEffect( () => {
      const result = getSearchResult(input);
      setCourses(result);
  }, [setCourses, input]);

  function onChange(value) {
    console.log(`selected ${value}`);
    history.push(`/course-selector/${value}`);
  }
  
  function onSearch(val) {
    console.log('search:', val);
  }

  return (
    <Search
      showSearch={true}
      style={{ width: '20rem', marginRight: '0.5rem' }}
      onChange={onChange}
      onSearch={onSearch}
      data={courses}
    />
  );
}

// const DebounceSelect = ({ fetchOptions, debounceTimeout = 800, ...props }) => {
//   const [fetching, setFetching] = useState(false);
//   const [options, setOptions] = useState([]);
//   const fetchRef = useRef(0);

//   const debounceFetcher = useMemo(() => {
//     const loadOptions = (value) => {
//       fetchRef.current += 1;
//       const fetchId = fetchRef.current;
//       setOptions([]);
//       setFetching(true);
//       fetchOptions(value).then((newOptions) => {
//         if (fetchId !== fetchRef.current) {
//           // for fetch callback order
//           return;
//         }

//         setOptions(newOptions);
//         setFetching(false);
//       });
//     };

//     return debounce(loadOptions, debounceTimeout);
//   }, [fetchOptions, debounceTimeout]);
//   return (
//     <Select
//       labelInValue
//       filterOption={false}
//       onSearch={debounceFetcher}
//       notFoundContent={fetching ? <Spin size="small" /> : null}
//       {...props}
//       options={options}
//     />
//   );
// } // Usage of DebounceSelect



// export default function SearchCourse() {
//   const [value, setValue] = useState([]);

//   const dispatch = useDispatch();
//   const courses = useSelector(state => state.updateCourses.courses);

//   useEffect(() => {
//     dispatch(getAllCourses());
//   }, []);

//   async function fetchUserList(username) {
//     // console.log('fetching user', username);
//     // return fetch('https://randomuser.me/api/?results=5')
//     //   .then((response) => response.json())
//     //   .then((body) =>
//     //     body.results.map((user) => ({
//     //       label: `${user.name.first} ${user.name.last}`,
//     //       value: user.login.username,
//     //     })),
//     //   );
//     return Object.keys(courses).map(course => ({
//       label: course,
//       value: course
//     }));
//   }

//   return (
//     <DebounceSelect
//       mode="multiple"
//       value={value}
//       placeholder="Search a course"
//       fetchOptions={fetchUserList}
//       onChange={(newValue) => {
//         setValue(newValue);
//       }}
//       style={{ width: '20rem', marginRight: '0.5rem' }}
//     />
//   );
// }