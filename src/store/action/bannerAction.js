import firebase from "../../config/firebase";

export const addBanner = (formData) => {
    console.log(formData)
  return async (dispatch) => {
    try {
      const storageRef = firebase.storage().ref();

      const bannerRef = storageRef.child(`Banner/${formData?.banner?.name}`);
      await bannerRef.put(formData?.banner);
      const bannerUrl = await bannerRef.getDownloadURL();

      const data = {
        banner: bannerUrl,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };

      await firebase.firestore().collection("banner").add(data);

      console.log("Banner added successfully!");
    } catch (error) {
      console.error("Error adding Banner:", error);
    }
  };
};

export const getBanner = () => async (dispatch) => {
    try {
      firebase
        .firestore()
        .collection("banner")
        .orderBy("timestamp","desc")
        .onSnapshot(async (data) => {
          let tempData = [];
          for (let doc of data.docs) {
            let id = doc.id;
            let data1 = doc.data();
            tempData.push({ id: id, ...data1 });
          }
          dispatch({ type: "GET_BANNER", payload: tempData });
          // dispatch(setIsLoading(false));
        });
    } catch (error) {
      // dispatch(setIsLoading(false));
      alert(error.message);
    }
  };


export const updateBanner = (formData) => {
    console.log(formData,'ahsanahsanahsan')
    return async (dispatch) => {
      try {
        const storageRef = firebase.storage().ref();
  
        let bannerUrl = formData.banner;
  
        if (formData.banner instanceof File) {
          const bannerRef = storageRef.child(`banner/${formData.banner.name}`);
          await bannerRef.put(formData.banner);
          bannerUrl = await bannerRef.getDownloadURL();
        }


        const data = {
            banner: bannerUrl,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          };
  
        await firebase
          .firestore()
          .collection("posts")
          .doc(formData.id)
          .update(data);
  
        console.log("Banner Updated successfully!");
      } catch (error) {
        console.error("Error updating Banner:", error);
      }
    };
  };