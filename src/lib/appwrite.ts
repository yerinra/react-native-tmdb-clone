import {
	Account,
	AppwriteException,
	Avatars,
	Client,
	Databases,
	ID,
	Query,
} from "react-native-appwrite";
import { MovieDetail } from "./types";

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
		if (!currentAccount) throw new Error("해당하는 유저가 없습니다.");

		const currentUser = await databases.listDocuments(config.databaseId, config.userCollectionId, [
			Query.equal("accountId", currentAccount.$id),
		]);

		if (!currentUser || currentUser.documents.length === 0) {
			return null;
		}

		return currentUser.documents[0];
	} catch (error: any) {
		throw new Error(error);
	}
};

// 평가 데이터를 업데이트하는 함수
export const updateRating = async (userId: string, movie: MovieDetail, rating: number) => {
	const newData = {
		user: userId, // userId 대신 user.$id를 사용
		title: movie.title,
		popularity: movie.popularity,
		movieId: movie.id,
		release_date: movie.release_date,
		vote_average: movie.vote_average,
		poster_path: movie.poster_path,
		rating,
	};

	const documentId = `${userId}-${movie.id}`; // 사용자 ID와 영화 ID를 조합하여 고유한 문서 ID 생성
	try {
		if (rating == 0) {
			await databases.deleteDocument(config.databaseId, config.ratingCollectionId, documentId);
		} else
			await databases.createDocument(
				config.databaseId,
				config.ratingCollectionId,
				documentId,
				newData,
			);
	} catch (error: any) {
		if (error.code === 409) {
			await databases.updateDocument(
				config.databaseId,
				config.ratingCollectionId,
				documentId,
				newData,
			);
		} else {
			console.error("Error updating rating:", error);
		}
	}
};

//
export const getUserRatingForMovie = async (userId: string, movieId: number) => {
	try {
		const response = await databases.listDocuments(config.databaseId, config.ratingCollectionId, [
			Query.equal("user", userId),
			Query.equal("movieId", movieId),
		]);

		if (response.documents.length > 0) {
			return response.documents[0];
		}

		return null;
	} catch (error: any) {
		console.error("Error fetching user rating for movie:", error);
		throw error;
	}
};

export const addFavorite = async (userId: string, movie: MovieDetail) => {
	const newData = {
		user: userId, // user.$id를 사용
		title: movie.title,
		popularity: movie.popularity,
		movieId: movie.id,
		release_date: movie.release_date,
		vote_average: movie.vote_average,
		poster_path: movie.poster_path,
	};

	const documentId = `${userId}-${movie.id}`; // 사용자 ID와 영화 ID를 조합하여 고유한 문서 ID 생성
	try {
		await databases.createDocument(
			config.databaseId,
			config.favoriteCollectionId,
			documentId,
			newData,
		);
	} catch (error: any) {
		if (error.code !== 409) {
			console.error("Error adding favorite:", error);
		}
	}
};

export const removeFavorite = async (userId: string, movieId: number) => {
	const documentId = `${userId}-${movieId}`;
	try {
		await databases.deleteDocument(config.databaseId, config.favoriteCollectionId, documentId);
	} catch (error: any) {
		console.error("Error removing favorite:", error);
	}
};

export const getUserFavoriteForMovie = async (userId: string, movieId: number) => {
	try {
		const response = await databases.listDocuments(config.databaseId, config.favoriteCollectionId, [
			Query.equal("user", userId),
			Query.equal("movieId", movieId),
		]);
		return response.documents.length > 0 ? response.documents[0] : null;
	} catch (error: any) {
		console.error("Error fetching user favorite:", error);
	}
};

export const getAllUserRatings = async (userId: string) => {
	try {
		const response = await databases.listDocuments(config.databaseId, config.ratingCollectionId, [
			Query.equal("user", userId),
		]);
		return response.documents;
	} catch (error: any) {
		console.error("Error fetching user ratings:", error);
		throw error;
	}
};

export const getAllUserFavorites = async (userId: string) => {
	try {
		const response = await databases.listDocuments(config.databaseId, config.favoriteCollectionId, [
			Query.equal("user", userId),
		]);
		return response.documents;
	} catch (error: any) {
		console.error("Error fetching user ratings:", error);
		throw error;
	}
};
