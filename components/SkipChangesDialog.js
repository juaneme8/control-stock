import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from '@chakra-ui/react';
import  { useRef, useState } from 'react';

export default function SkipChangesDialog({isOpen, setIsOpen,handleSkipChanges}) {
    
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
                Cambios sin guardar
              </AlertDialogHeader>
  
              <AlertDialogBody>
                Hay cambios en reparaciones sin guardar, ¿desea continuar de todos modos?
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancelar
                </Button>
                <Button colorScheme="blue" onClick={handleSkipChanges} ml={3}>
                  Aceptar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }