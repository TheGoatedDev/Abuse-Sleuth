const sanatiseLogReport = (
    docSnap: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
): LogReport => {
    const data = docSnap.data();
    const logReport: LogReport = {
        id: docSnap.id,
        ownerUID: data?.ownerUID,
        createdAt: data?.createdAt.toDate(),
    };

    return logReport;
};

export default sanatiseLogReport;
