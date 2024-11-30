export const CONTRACT_ADDRESS = "0xc90AFEC15fc690E81fAb9692C0b3d50d8D5783Fa"
export const CONTRACT_ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "student",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "institution",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "credentialId",
                "type": "uint256"
            }
        ],
        "name": "CredentialIssued",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "credentialId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "to",
                "type": "address"
            }
        ],
        "name": "CredentialTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "credentialId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "verified",
                "type": "bool"
            }
        ],
        "name": "CredentialVerified",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "institution",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "name": "InstitutionRegistered",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_student",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_detailsURI",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "_transferable",
                "type": "bool"
            }
        ],
        "name": "issueCredential",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_metadataURI",
                "type": "string"
            }
        ],
        "name": "registerInstitution",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_credentialId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_newOwner",
                "type": "address"
            }
        ],
        "name": "transferCredential",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_credentialId",
                "type": "uint256"
            }
        ],
        "name": "verifyCredential",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "credentialCounter",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "credentials",
        "outputs": [
            {
                "internalType": "address",
                "name": "issuedTo",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "issuedBy",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "detailsURI",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "verified",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "transferable",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_credentialId",
                "type": "uint256"
            }
        ],
        "name": "getCredentialDetails",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "issuedTo",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "issuedBy",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "detailsURI",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "verified",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "transferable",
                        "type": "bool"
                    }
                ],
                "internalType": "struct CredentialMarketplace.Credential",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_student",
                "type": "address"
            }
        ],
        "name": "getStudentCredentials",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "institutions",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "metadataURI",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "isRegistered",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "studentCredentials",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
