import {
  useBedrock,
  useCreateNonceLink,
  useNonceSocket,
  AuthorizationData,
  TransactionStatuses,
} from "@bedrock-foundation/react-sdk";
import { Button, Modal, ModalBody, ModalContent, ModalOverlay, useDisclosure, VStack } from "@chakra-ui/react";
import { useState } from "react";
import QRCode from "react-qr-code";


const QRModal = (props: {isOpen: boolean, onClose: ()=>void, result:any }) => {
  const {isOpen,onClose,result} = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay 
        bg='whiteAlpha.300'
        backdropFilter='blur(10px)'
      />
      <ModalContent>
        <ModalBody>
          <VStack>
            <QRCode value={result?.link ?? ""} size={256}/>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export const QRcodeButton = () => {
  const [authData, setAuthData] = useState<AuthorizationData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const { isOpen, onOpen, onClose} = useDisclosure();

  const bedrock = useBedrock();

  const {
    core: {
      createAuthorizationNonceLink
    },
  } = bedrock;

  const { result, loading } = useCreateNonceLink(createAuthorizationNonceLink, {
    params: {
      gate: {
        collectionId: "7NcjdKuP5nfCcXZHF79gqQBjirFjQXZXZrsM51CZz5yk",
      },
    },
  });

  useNonceSocket<AuthorizationData>({
    bedrock,
    nonce: result?.nonce ?? "",
    onChange: (data: AuthorizationData) => {
      setAuthData(data);
    },
    onError: setError,
  });

  return (
    <Button>
      <QRModal isOpen={isOpen} onClose={onClose} result={result}/>
    </Button>
  )
}