import React from 'react'
import { EmptyState, Button } from 'vtex.styleguide'

const ReviewEmpty = (props: any) => (
  <EmptyState title="Avaliações">
    <p>
      Ainda não foram feitas avaliações para este produto, o que acha de deixar uma?
    </p>

    <div className="pt5">
      <Button variation="primary" onClick={() => props.writeReview()}>
        Escrever avaliação
      </Button>
    </div>
  </EmptyState>
)

export default ReviewEmpty