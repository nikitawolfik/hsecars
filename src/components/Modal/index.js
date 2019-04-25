import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import DefaultModal from 'react-modal';

import Button from '../Button';
import Card from '../Card';
import './styles.css';
import styles from './styles.module.scss';

DefaultModal.setAppElement(document.getElementById('modal-root'));

const getParent = () => (document.querySelector('#modal-root'));

class Modal extends PureComponent {
  static propTypes = {
    submit: PropTypes.func,
    title: PropTypes.string.isRequired,
    children: PropTypes.func,
    hideSubmitButton: PropTypes.bool,
    hideCloseButton: PropTypes.bool,
    submitButtonText: PropTypes.string,
    closeButtonText: PropTypes.string,
    autoclose: PropTypes.bool,
  }

  static defaultProps = {
    submitButtonText: 'Подтвердить',
    closeButtonText: 'Закрыть',
  }

  state = {
    params: null,
    title: '',
    active: false,
  }

  toggleModal = ({ params, title } = {}) => {
    if (this.props.autoclose && !this.state.active) {
      this.timer = setTimeout(this.closeModal, 2500);
    }
    this.setState(({ active }) => ({
      params,
      title,
      active: !active,
    }));
  }

  closeModal = () => {
    if (this.props.autoclose) {
      clearTimeout(this.timer);
    }
    this.setState(() => ({ active: false }));
  }

  submit = () => {
    this.toggleModal();
    this.props.submit(this.state.params);
  }

  render() {
    return (
      <Fragment>
        {this.props.children ? this.props.children(this.toggleModal) : null}
        <DefaultModal
          closeTimeoutMS={250}
          parentSelector={getParent}
          isOpen={this.state.active}
          overlayClassName={styles.overlay}
          className={styles.container}
          onRequestClose={this.closeModal}
          shouldCloseOnOverlayClick
        >
          <Card>
            <div className={styles.wrapper}>
              <h3 className={styles.title}>{this.state.title || this.props.title}</h3>
              <div className={styles.buttonWrapper}>
                {!this.props.hideCloseButton && (
                  <Button
                    transparent
                    medium
                    title={this.props.closeButtonText}
                    onClick={this.closeModal}
                  />
                )}
                {!this.props.hideSubmitButton && (
                  <Button
                    primary
                    medium
                    title={this.props.submitButtonText}
                    onClick={this.submit}
                    customStyle={styles.submitButton}
                  />
                )}
              </div>
            </div>
          </Card>
        </DefaultModal>
      </Fragment>
    );
  }
}

export default Modal;
