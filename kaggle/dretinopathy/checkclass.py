import numpy as np
import matplotlib.pyplot as plt
import os
import sys

caffe_root = '/home/neeraj/Softwares/caffe_cpu/'  # this file is expected to be in {caffe_root}/examples
sys.path.insert(0, caffe_root + 'python')

import caffe
import getopt, sys

def predictClass(input):
	# Set the right path to your model definition file, pretrained model weights,
	# and the image you would like to classify.
	MODEL_FILE = './deploy.prototxt'
	PRETRAINED = './dr_train_iter_1000.caffemodel'
	IMAGE_FILE = input #'images/cat.jpg'

	caffe.set_mode_cpu()
	net = caffe.Classifier(MODEL_FILE, PRETRAINED,
	                       mean=np.load('/home/neeraj/data/mywork/datascience/kaggle/imagenet_dr_mean.npy').mean(1).mean(1),
	                       channel_swap=(2,1,0),
	                       raw_scale=255,
	                       image_dims=(227, 227))

	input_image = caffe.io.load_image(IMAGE_FILE)
	#plt.imshow(input_image)
	prediction = net.predict([input_image])  # predict takes any number of images, and formats them for the Caffe net automatically
	print prediction
	return prediction[0].argmax()
	 
	#print 'prediction shape:', prediction[0].shape
	#plt.plot(prediction[0])
	#print 'predicted class:', prediction[0].argmax()

def main():
    try:
        opts, args = getopt.getopt(sys.argv[1:], "f:c:", ["file=class="])
    except getopt.GetoptError as err:
        # print help information and exit:
        print str(err) # will print something like "option -a not recognized"
        usage()
        sys.exit(2)
    inputfile = None
    inputclass = None
    for o, a in opts:
        if o in ("-f", "--file"):
            inputfile = a
        elif o in ("-c","--class"):
        	inputclass = a 
        else:
            assert False, "unhandled option"
    
    if inputclass != None and inputfile != None : 
    	predictedClass = predictClass(inputfile)
    	if predictClass == inputclass:
    		return True 
    	else:
    		return False
    else:
    	print "Invalid input !!!"
    # ...

if __name__ == "__main__":
    main()