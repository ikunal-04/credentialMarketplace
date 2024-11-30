// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract CredentialMarketplace {
    // Events
    event InstitutionRegistered(address indexed institution, string name);
    event CredentialIssued(
        address indexed student,
        address indexed institution,
        uint256 credentialId
    );
    event CredentialVerified(uint256 credentialId, bool verified);
    event CredentialTransferred(uint256 credentialId, address from, address to);

    // Structs
    struct Institution {
        string name;
        string metadataURI;
        bool isRegistered;
    }

    struct Credential {
        address issuedTo;
        address issuedBy;
        string detailsURI; // URI to the credential metadata (e.g., IPFS link)
        bool verified;
        bool transferable;
    }

    // State Variables
    mapping(address => Institution) public institutions;
    mapping(uint256 => Credential) public credentials;
    mapping(address => uint256[]) public studentCredentials;
    uint256 public credentialCounter;

    // Modifiers
    modifier onlyRegisteredInstitution() {
        require(
            institutions[msg.sender].isRegistered,
            "Only registered institutions can call this."
        );
        _;
    }

    modifier onlyOwner(uint256 _credentialId) {
        require(
            credentials[_credentialId].issuedTo == msg.sender,
            "Not the credential owner."
        );
        _;
    }

    // Functions
    /// @notice Register an institution
    function registerInstitution(string memory _name, string memory _metadataURI)
        external
    {
        institutions[msg.sender] = Institution({
            name: _name,
            metadataURI: _metadataURI,
            isRegistered: true
        });
        emit InstitutionRegistered(msg.sender, _name);
    }

    /// @notice Issue a credential to a student
    function issueCredential(
        address _student,
        string memory _detailsURI,
        bool _transferable
    ) external onlyRegisteredInstitution {
        require(_student != address(0), "Invalid student address");
        
        credentialCounter++;
        credentials[credentialCounter] = Credential({
            issuedTo: _student,
            issuedBy: msg.sender,
            detailsURI: _detailsURI,
            verified: false,
            transferable: _transferable
        });
        studentCredentials[_student].push(credentialCounter);
        
        emit CredentialIssued(_student, msg.sender, credentialCounter);
    }

    /// @notice Verify a credential (by the issuing institution)
    function verifyCredential(uint256 _credentialId)
        external
        onlyRegisteredInstitution
    {
        require(
            credentials[_credentialId].issuedBy == msg.sender,
            "Not authorized to verify this credential."
        );
        require(_credentialId > 0 && _credentialId <= credentialCounter, "Invalid credential ID");
        
        credentials[_credentialId].verified = true;
        emit CredentialVerified(_credentialId, true);
    }

    /// @notice Transfer ownership of a credential
    function transferCredential(uint256 _credentialId, address _newOwner)
        external
        onlyOwner(_credentialId)
    {
        require(_newOwner != address(0), "Invalid new owner address");
        require(
            credentials[_credentialId].transferable,
            "Credential is not transferable."
        );
        require(_credentialId > 0 && _credentialId <= credentialCounter, "Invalid credential ID");
        
        address previousOwner = credentials[_credentialId].issuedTo;
        credentials[_credentialId].issuedTo = _newOwner;
        
        // Remove credential from previous owner's list
        _removeCredentialFromStudent(previousOwner, _credentialId);
        
        // Add credential to new owner's list
        studentCredentials[_newOwner].push(_credentialId);
        
        emit CredentialTransferred(_credentialId, previousOwner, _newOwner);
    }

    /// @notice Internal function to remove a credential from a student's list
    function _removeCredentialFromStudent(address _student, uint256 _credentialId) internal {
        uint256[] storage studentCreds = studentCredentials[_student];
        for (uint256 i = 0; i < studentCreds.length; i++) {
            if (studentCreds[i] == _credentialId) {
                studentCreds[i] = studentCreds[studentCreds.length - 1];
                studentCreds.pop();
                break;
            }
        }
    }

    /// @notice Fetch all credentials of a student
    function getStudentCredentials(address _student)
        external
        view
        returns (uint256[] memory)
    {
        return studentCredentials[_student];
    }

    /// @notice Fetch details of a specific credential
    function getCredentialDetails(uint256 _credentialId)
        external
        view
        returns (Credential memory)
    {
        require(_credentialId > 0 && _credentialId <= credentialCounter, "Invalid credential ID");
        return credentials[_credentialId];
    }
}