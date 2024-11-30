/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Spinner } from '@/components/ui/spinner'

export default function StudentCredentials({ contract, account }: { contract: ethers.Contract, account: string }) {
  const [credentials, setCredentials] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchCredentials()
  }, [account])

  const fetchCredentials = async () => {
    setIsLoading(true)
    try {
      const credentialIds = await contract.getStudentCredentials(account)
      const credentialDetails = await Promise.all(
        credentialIds.map((id: ethers.BigNumberish) => contract.getCredentialDetails(id))
      )
      console.log('credentialDetails:', credentialIds);
      
      setCredentials(credentialDetails.map((detail: any, index: number) => ({
        id: credentialIds[index].toString(),
        ...detail
      })))
    } catch (error) {
      console.error('Error fetching student credentials:', error)
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Your Credentials</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Issued By</TableHead>
            <TableHead>Details URI</TableHead>
            <TableHead>Verified</TableHead>
            <TableHead>Transferable</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {credentials.map((credential) => (
            <TableRow key={credential.id}>
              <TableCell>{credential.id}</TableCell>
              <TableCell>{credential.issuedBy}</TableCell>
              <TableCell>{credential.detailsURI}</TableCell>
              <TableCell>{credential.verified ? 'Yes' : 'No'}</TableCell>
              <TableCell>{credential.transferable ? 'Yes' : 'No'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={fetchCredentials} disabled={isLoading} className="mt-2">
        {isLoading ? <><Spinner className="mr-2" /> Loading...</> : 'Refresh Credentials'}
      </Button>
    </div>
  )
}

