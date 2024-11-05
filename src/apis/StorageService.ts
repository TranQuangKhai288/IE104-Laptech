// src/services/StorageService.ts

import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import { message } from 'antd';

// Hàm tạo tên file unique
const generateUniqueFileName = (originalName: string): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop();
  return `${timestamp}-${randomString}.${extension}`;
};

// Upload một file
export const uploadFile = async (file: File, folder: string = 'products'): Promise<string> => {
  try {
    const uniqueFileName = generateUniqueFileName(file.name);
    const storageRef = ref(storage, `${folder}/${uniqueFileName}`);
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Lỗi khi tải file lên!');
  }
};

// Upload nhiều files
export const uploadMultipleFiles = async (
  files: File[], 
  folder: string = 'products'
): Promise<string[]> => {
  try {
    const uploadPromises = files.map(file => uploadFile(file, folder));
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error('Error uploading multiple files:', error);
    throw new Error('Lỗi khi tải nhiều files lên!');
  }
};

// Xóa file từ URL
export const deleteFileByUrl = async (url: string): Promise<void> => {
  try {
    const fileRef = ref(storage, url);
    await deleteObject(fileRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new Error('Lỗi khi xóa file!');
  }
};

// Xóa nhiều files từ URLs
export const deleteMultipleFiles = async (urls: string[]): Promise<void> => {
  try {
    const deletePromises = urls.map(url => deleteFileByUrl(url));
    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error deleting multiple files:', error);
    throw new Error('Lỗi khi xóa nhiều files!');
  }
};