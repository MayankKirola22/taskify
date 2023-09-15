import { collection, doc, getDocs, deleteDoc, getDoc, updateDoc, setDoc, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export const getAll = async (CollectionName) => {
  let items=[];
  await getDocs(collection(db, CollectionName))
      .then((querySnapshot)=>{               
          querySnapshot.docs
            .forEach((doc) => items.push({...doc.data(), id:doc.id }));                
      })
  return items;
}

export const getByID =async (CollectionName,id) =>{
    const docRef = doc(db, CollectionName, id);
    let item=await getDoc(docRef);
    return {...item.data(),id:item.id};
}
export const getbyUserId=async (userId)=>{
  const docRef = collection(db, 'Tasks');
  
  let items=[];
  await getDocs(docRef)
  .then((querySnapshot)=>{               
      querySnapshot.docs.filter((doc)=>doc.data().User===userId)
        .forEach((doc) => items.push({...doc.data(), id:doc.id }));                
  })
  return items;
}
export const addRecordwithID = async (CollectionName,record,id) =>{
  const docRef = doc(db, CollectionName, id);
  await setDoc(docRef,record);
}
export const addRecord = async (CollectionName,record) =>{
  const docRef = addDoc(collection(db, CollectionName), record);
}

export const deleteRecord = async (CollectionName,id) => {
  const docRef = doc(db, CollectionName, id);
  await deleteDoc(docRef)
}

export const updateRecord = async (CollectionName,id,changes) => {
  const docRef = doc(db, CollectionName, id);
  await updateDoc(docRef,changes)
}