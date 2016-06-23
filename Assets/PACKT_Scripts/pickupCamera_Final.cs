using UnityEngine;
using System.Collections;

public class pickupCamera_Final : MonoBehaviour 
{
	public float life = 1.5f;
	public Transform pickTarget;
	public Transform origTarget;
	public float damping = 5f;
	public Vector3 camOffset;

	void SentTarget () 
	{
		Vector3 fixedPos = transform.position + camOffset;
		transform.position = fixedPos;
		Vector3 lookAtPosition = pickTarget.position;
		lookAtPosition.y = transform.position.y;
		lookAtPosition.z = transform.position.z;
		Quaternion rotation = Quaternion.LookRotation (lookAtPosition - transform.position);
		transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * damping);
		Invoke ("ReturnTarget", life);
	}
	
	void ReturnTarget () 
	{
		Vector3 origPosition = origTarget.position;
		origPosition.y = transform.position.y;
		origPosition.z = transform.position.z;
		
		Quaternion rotation = Quaternion.LookRotation(origPosition - transform.position);
		transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime * damping);
		Destroy(transform.parent.gameObject);
	}
}
