const sanatiseIPProfile = (
    docSnap: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
): IPProfile => {
    const data = docSnap.data();
    const ipProfile: IPProfile = {
        ipAddress: data?.ipAddress,
        createdAt: data?.createdAt.toDate(),
    };

    return ipProfile;
};

export default sanatiseIPProfile;
