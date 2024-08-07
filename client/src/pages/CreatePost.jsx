import { Alert, Button, FileInput, Select, Textarea, TextInput } from 'flowbite-react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [userCategory, setUserCategory] = useState([]);
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/dashboard?tab=posts`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`/api/category/getcategory`);
        const data = await res.json();
        console.log('API Response:', data); // Log the response
        if (res.ok) {
          setUserCategory(data.category);
        }
      } catch (error) {
        console.log('Error fetching categories:', error.message);
      }
    };

      fetchCategory();
  }, []);


  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Character Name'
            required
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="none">None</option>
                {userCategory.map((item, index) => (
                    <option key={index} value={item.name}>{item.name}</option>
                ))}
          </Select>
          
        </div>

        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        <TextInput
            type='text'
            placeholder='Height'
            
            id='height'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, height: e.target.value })
            }
          />
          <TextInput
            type='text'
            placeholder='Weight'
            
            id='weight'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, weight: e.target.value })
            }
          />
          
        </div>

        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        
        <TextInput
            type='text'
            placeholder='Gender'
            
            id='gender'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
          />
          <TextInput
            type='text'
            placeholder='Ability'
            
            id='ability'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, ability: e.target.value })
            }
          />
          
        </div>

        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        
        <TextInput
            type='text'
            placeholder='Hobbies'
            
            id='hobbies'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, hobbies: e.target.value })
            }
          />
          <TextInput
            type='text'
            placeholder='Family Name'
            
            id='faname'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, faname: e.target.value })
            }
          />
          
        </div>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        
        <TextInput
            type='text'
            placeholder='HP'
            
            id='hp'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, hp: e.target.value })
            }
          />
          <TextInput
            type='text'
            placeholder='Speed'
            
            id='speed'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, speed: e.target.value })
            }
          />
          
        </div>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        
        <TextInput
            type='text'
            placeholder='Attack'
            
            id='attack'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, attack: e.target.value })
            }
          />
          <TextInput
            type='text'
            placeholder='Defense'
            
            id='defense'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, defense: e.target.value })
            }
          />
          
        </div>
        <Textarea
            type='text'
            placeholder='About Character'
            required
            maxLength={250}
            id='description'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )}
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Publish
        </Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}