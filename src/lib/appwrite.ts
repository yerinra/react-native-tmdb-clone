import {
	Account,
	AppwriteException,
	Avatars,
	Client,
	Databases,
	ID,
	Query,
} from "react-native-appwrite";

export const config = {
	endpoint: "https://cloud.appwrite.io/v1",
	platform: "com.yerinra.rn_tmdb",
	projectId: "6674f781001ab229e2fe",
	databaseId: "6674f92d002fa0178d5d",
	userCollectionId: "6674f94500212687c3df",
	favoriteCollectionId: "6674f969002aa4476fef",
	ratingCollectionId: "6674f9740026cda2ee1e",
};

// Init your React Native SDK
const client = new Client();

client
	.setEndpoint(config.endpoint) // Your Appwrite Endpoint
	.setProject(config.projectId) // Your project ID
	.setPlatform(config.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email: string, password: string, username: string) => {
	try {
		const newAccount = await account.create(ID.unique(), email, password, username);
		if (!newAccount) throw Error;
		const avatarUrl = avatars.getInitials(username);

		await signIn(email, password);
		const newUser = databases.createDocument(
			config.databaseId,
			config.userCollectionId,
			ID.unique(),
			{ accountId: newAccount.$id, email, username, avatar: avatarUrl },
		);
		return newUser;
	} catch (error: any) {
		if (error instanceof AppwriteException) {
			if (error.code === 409) {
				throw new Error("이미 등록된 이메일입니다.");
			} else if (error.code === 400) {
				throw new Error("비밀번호는 최소 8자 이상이어야 합니다.");
			}
		}
		// console.log(error.code);
		throw new Error(error);
	}
};

export const signIn = async (email: string, password: string) => {
	try {
		const session = await account.createEmailPasswordSession(email, password);

		return session;
	} catch (error: any) {
		throw new Error(error);
	}
};

export const signOut = async () => {
	try {
		await account.deleteSession("current");
	} catch (error: any) {
		throw new Error(error);
	}
};

export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get();

		if (!currentAccount) throw Error;

		const currentUser = await databases.listDocuments(config.databaseId, config.userCollectionId, [
			Query.equal("accountId", currentAccount.$id),
		]);

		if (!currentUser) throw new Error("해당하는 유저가 없습니다.");
		console.log(currentUser.documents[0]);
		return currentUser.documents[0];
	} catch (error: any) {
		throw new Error(error);
	}
};
