import {
    collection,
    getDocs,
    orderBy,
    query,
    where,
    or,
    limit,
    getDoc,
    doc,
    setDoc,
} from 'firebase/firestore'
import { firestore } from './init'

class FirebaseQuery {
    constructor() {
        this.modelRef = null
        this.filters = null
        this.orderBy = null
        this.limit = null
    }
}

export class FirebaseQueryBuilder {
    // TODO: Not all firebase documents have an id field, so this will yield no results
    constructor(
        defaultOrderBy = new FirebaseQueryBuilder.OrderBy('id', 'asc'),
        defaultLimit
    ) {
        this.firebaseQuery = new FirebaseQuery()
        this.setOrderBy(defaultOrderBy)
        this.setLimit(defaultLimit)
    }

    static OrderBy = class {
        constructor(field, order) {
            this.field = field
            this.order = order
        }
    }

    static Filter = class {
        constructor(field, operator, value) {
            this.field = field
            this.operator = operator
            this.value = value
        }
    }

    setModelRef(modelRef) {
        this.firebaseQuery.modelRef = collection(firestore, modelRef)
    }

    setFilter(filter) {
        this.firebaseQuery.filters = where(
            filter.field,
            filter.operator,
            filter.value
        )
    }

    setOrFilter(orFilters) {
        this.firebaseQuery.filters = or(
            ...orFilters.map((orFilter) => where(orFilter.field, orFilter.operator, orFilter.value))
        )
    }

    setOrderBy(orderByField) {
        this.firebaseQuery.orderBy = orderBy(
            orderByField.field,
            orderByField.order
        )
    }

    setLimit(limitSize) {
        this.firebaseQuery.limit = limit(limitSize)
    }

    build() {
        if (!this.firebaseQuery.filters) {
            return query(
                this.firebaseQuery.modelRef,
                this.firebaseQuery.orderBy,
                this.firebaseQuery.limit
            )
        }

        return query(
            this.firebaseQuery.modelRef,
            this.firebaseQuery.filters,
            this.firebaseQuery.orderBy,
            this.firebaseQuery.limit
        )
    }
}

function marshalResultsSnapshot(resultsSnapshot) {
    return resultsSnapshot.docs.map((resultDoc) => ({
        id: resultDoc.id,
        ...resultDoc.data(),
    }))
}

export async function performFirebaseQueryAndReturnResults(firebaseQuery) {
    const resultsSnapshot = await getDocs(firebaseQuery)

    return marshalResultsSnapshot(resultsSnapshot)
}

export async function getDocumentFromCollection(collectionName, documentId) {
    const docRef = doc(firestore, collectionName, documentId)
    const docSnap = await getDoc(docRef)

    return docSnap.data()
}

export async function createOrEditDocumentInCollection(
    collectionName,
    documentId,
    document
) {
    await setDoc(doc(firestore, collectionName, documentId), document)
}

export async function fetchAndAddFirestoreCollectionsToZipFile(
    zip,
    ...collectionNames
) {
    const getDocumentsFromCollectionsPromises = collectionNames.map(
        async (collectionName) => {
            const queryBuilder = new FirebaseQueryBuilder()
            queryBuilder.setModelRef(collectionName)

            const documents = await performFirebaseQueryAndReturnResults(
                queryBuilder.build()
            )

            const fileName = `${collectionName}.json`
            const fileContent = JSON.stringify(documents, null, 2) // Beautify json contents

            zip.file(fileName, fileContent)
        }
    )

    return Promise.all(getDocumentsFromCollectionsPromises)
}
