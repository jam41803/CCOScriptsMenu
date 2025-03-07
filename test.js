const getArmory = async () => {
    const res = await fetch("/api/armory", {
      method: "GET",
    });
    if (!res.ok) {
      const error = await res.json();
      throw error.error;
    }
    //it will only return the amount of cases, no json, just the amount
    return await res.json();
};

const deleteArmory = async () => {
    const res = await fetch("/api/armory", {
        method:  "DELETE"
    })
    if (!res.ok) {
        const error = await res.json();
        throw error.error;
    }
    return await res.json()
}

// Example get response
// {
//     "credits": 194,
//     "armoryPasses": [
//       {
//         "_id": "67ca5d8a636b2524fdf4c2d8",
//         "userId": "64c80484f7c11b06e0fa565f",
//         "xp": 0,
//         "isActive": true,
//         "createdAt": "2025-03-07T02:44:26.376Z",
//         "updatedAt": "2025-03-07T02:44:26.376Z",
//         "__v": 0
//       },
//       {
//         "_id": "67ca5e82809d832a6bfbc2e3",
//         "userId": "64c80484f7c11b06e0fa565f",
//         "xp": 0,
//         "isActive": true,
//         "createdAt": "2025-03-07T02:48:34.652Z",
//         "updatedAt": "2025-03-07T02:48:34.652Z",
//         "__v": 0
//       },
//       {
//         "_id": "67ca5e8bf89ac8297adaf2b0",
//         "userId": "64c80484f7c11b06e0fa565f",
//         "xp": 0,
//         "isActive": true,
//         "createdAt": "2025-03-07T02:48:43.549Z",
//         "updatedAt": "2025-03-07T02:48:43.549Z",
//         "__v": 0
//       },
//       {
//         "_id": "67ca5e8c809d832a6bfbd029",
//         "userId": "64c80484f7c11b06e0fa565f",
//         "xp": 0,
//         "isActive": true,
//         "createdAt": "2025-03-07T02:48:44.356Z",
//         "updatedAt": "2025-03-07T02:48:44.356Z",
//         "__v": 0
//       },
//       {
//         "_id": "67ca5e8d636b2524fdf67469",
//         "userId": "64c80484f7c11b06e0fa565f",
//         "xp": 0,
//         "isActive": true,
//         "createdAt": "2025-03-07T02:48:45.028Z",
//         "updatedAt": "2025-03-07T02:48:45.028Z",
//         "__v": 0
//       }
//     ]
//   }