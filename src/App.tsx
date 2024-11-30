import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InstitutionRegistration from '@/components/InstitutionRegistration'
import CredentialIssuance from '@/components/CredentialIssuance'
import CredentialVerification from '@/components/CredentialVerification'
import CredentialTransfer from '@/components/CredentialTransfer'
import StudentCredentials from '@/components/StudentCredentials'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/consts'
import { Toaster } from '@/components/ui/toaster'

export default function Home() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [contract, setContract] = useState<ethers.Contract | null>(null)
  const [account, setAccount] = useState<string | null>(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const ethereum = window.ethereum as unknown as ethers.Eip1193Provider;
        const provider = new ethers.BrowserProvider(ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
        
        setProvider(provider)
        setContract(contract)

        const accounts = await provider.send("eth_requestAccounts", [])
        setAccount(accounts[0])

        window.ethereum?.on?.('accountsChanged', (accounts: string[]) => {
          setAccount(accounts[0])
        })
      } else {
        console.log('Please install MetaMask!')
      }
    }

    init()
  }, [])

  const handleCredentialIssued = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  if (!provider || !contract || !account) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Credential Marketplace</h1>
      <p className="mb-4">Connected Account: {account}</p>
      <Tabs defaultValue="institution">
        <TabsList>
          <TabsTrigger value="institution">Institution</TabsTrigger>
          <TabsTrigger value="student">Student</TabsTrigger>
        </TabsList>
        <TabsContent value="institution">
          <Card>
            <CardHeader>
              <CardTitle>Institution Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <InstitutionRegistration contract={contract} />
              <CredentialIssuance contract={contract} onCredentialIssued={handleCredentialIssued} />
              <CredentialVerification contract={contract} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="student">
          <Card>
            <CardHeader>
              <CardTitle>Student Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <StudentCredentials contract={contract} account={account} key={refreshTrigger}/>
              <CredentialTransfer contract={contract} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  )
}

