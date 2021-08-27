import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from '@chakra-ui/react';
import  { useRef, useState } from 'react';

export default function NewDeviceDialog({isOpen, setIsOpen,handleNewDevice}) {
    
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()
  
    return (
      <>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Crear Nuevo Equipo
              </AlertDialogHeader>
  
              <AlertDialogBody>
                El código ingresado no existe ¿desea crear un nuevo equipo?
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancelar
                </Button>
                <Button colorScheme="blue" onClick={handleNewDevice} ml={3}>
                  Crear
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }