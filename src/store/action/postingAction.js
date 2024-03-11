import firebase from "../../config/firebase";

export const addPost = (formData) => {
  return async (dispatch) => {
    try {
      const storageRef = firebase.storage().ref();

      const thumbnailRef = storageRef.child(`posts/${formData?.thumbnail?.name}`);
      await thumbnailRef.put(formData?.thumbnail);
      const thumbnailUrl = await thumbnailRef.getDownloadURL();

      const backgroundImgRef = storageRef.child(`posts/${formData?.backgroundImg?.name}`);
      await backgroundImgRef.put(formData?.backgroundImg);
      const backgroundImgUrl = await backgroundImgRef.getDownloadURL();

      const outerImgRef = storageRef.child(`posts/${formData?.outherimage?.name}`);
      await outerImgRef.put(formData?.outherimage);
      const outerImgUrl = await outerImgRef.getDownloadURL();

      const data = {
        title: formData.title,
        category: formData.category,
        subtitle: formData.subtitle,
        description: formData.description,
        thumbnail: thumbnailUrl,
        backgroundImg: backgroundImgUrl,
        outherimage: outerImgUrl,
        video: formData.video,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };

      console.log(data);

      await firebase
        .firestore()
        .collection("posts")
        .add(data);

      console.log("Post added successfully!");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };
};


export const getPost = () => async (dispatch) => {
  try {
    // dispatch(setIsLoading(true));
    firebase
      .firestore()
      .collection("posts")
      .orderBy("timestamp","desc")
      .onSnapshot(async (data) => {
        let tempData = [];
        for (let doc of data.docs) {
          let id = doc.id;
          let data1 = doc.data();
          tempData.push({ id: id, ...data1 });
        }
        dispatch({ type: "GET_POSTS", payload: tempData });
        // dispatch(setIsLoading(false));
      });
  } catch (error) {
    // dispatch(setIsLoading(false));
    alert(error.message);
  }
};

export const updatePost = (formData) => {
  console.log(formData,'ahsanahsanahsan')
  return async (dispatch) => {
    try {
      const storageRef = firebase.storage().ref();

      let thumbnailUrl = formData.thumbnail;
      let backgroundImgUrl = formData.backgroundImg;
      let outerImgUrl = formData.outherimage;

      if (formData.thumbnail instanceof File) {
        const thumbnailRef = storageRef.child(`posts/${formData.thumbnail.name}`);
        await thumbnailRef.put(formData.thumbnail);
        thumbnailUrl = await thumbnailRef.getDownloadURL();
      }

      if (formData.backgroundImg instanceof File) {
        const backgroundImgRef = storageRef.child(`posts/${formData.backgroundImg.name}`);
        await backgroundImgRef.put(formData.backgroundImg);
        backgroundImgUrl = await backgroundImgRef.getDownloadURL();
      }

      if (formData.outherimage instanceof File) {
        const outerImgRef = storageRef.child(`posts/${formData.outherimage.name}`);
        await outerImgRef.put(formData.outherimage);
        outerImgUrl = await outerImgRef.getDownloadURL();
      }

      const data = {
        title: formData.title,
        category: formData.category,
        subtitle: formData.subtitle,
        description: formData.description,
        thumbnail: thumbnailUrl,
        backgroundImg: backgroundImgUrl,
        outherimage: outerImgUrl,
        video: formData.video,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };

      await firebase
        .firestore()
        .collection("posts")
        .doc(formData.id)
        .update(data);

      console.log("Post Updated successfully!");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
};